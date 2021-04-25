"user strict"

const User = require("../../models/User")
const validator = require("validator");
const bcrypt = require("bcrypt");
const Task = require("../../models/Task");

/**
 * @description: Function is used to register a user 
 */
const registerUser = async (req, res) => {
    try{
        let requestData = new User(req.body)

        if (!validator.isEmail(requestData.email)) throw badRequestError(res, "Invalid Email !");
        if (requestData.age < 0) throw badRequestError(res, "Age must be a postive number");
        if (requestData.password.length < 6) throw badRequestError(res, "Minimum length of password should be 6");
        if (requestData.password.length > 32) throw badRequestError(res, "Maximum length of password should be 32");

        const emailExist = await User.findOne({ email: requestData.email });
        // console.log(emailExist)
        if(emailExist){
          throw badRequestError(res, "Email already registered with us.");
        }

        let saveUserData = await requestData.save();

        return okResponse(res, saveUserData, "User registered successfully !");
    } catch(error){
        console.log(error)
    }
}


/**
 * @description: Login API
 */
const UserLogin = async (req, res) => {
    try {
        let data = req.body;

        /** Validate for the empty fields */
        if (!data.email) throw badRequestError(res, "Please enter email.");
        if (!validator.isEmail(data.email)) throw badRequestError(res, "Please enter a valid email.");
        if (!data.password) throw badRequestError(res, "Please enter password.");
        if (data.password.length < 6) throw badRequestError(res, "Minimum length of password should be 6");
        if (data.password.length > 32) throw badRequestError(res, "Maximum length of password should be 32");

        /** Execute Query to fetch the user */
        let user = await User.findOne({ email: data.email });

        /* email not match */
        if (!user) {
          throw badRequestError(res, "Please enter valid credentials.");
        }

        /* check user is_active or not */
        if (user.is_active == false) {
          throw badRequestError(res, "You are blocked by admin.");
        }

        /* Check Password matched OR not */
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw badRequestError(res, "Unable to login! Incorrect password.");

        /****** Generate authenticated data and its auth_token *****/
        let authToken = await user.generateJWTtoken();
        // console.log(authToken)
        res.setHeader("Content-Type", "application/json");
        res.setHeader("AuthToken", authToken);
        res.setHeader("Access-Control-Expose-Headers", "AuthToken");
        /******-----------------------------------------------*****/

        //update token on specified _id
        let token = await User.updateOne({"_id": user._id}, { "auth_token": authToken });
        
        //----- delete private data here or see model USER toJSON method for shortcut
        // user = user.toObject();
        // delete user.password;
        // delete user.auth_token;

        return okResponse(res, user, "Login Successful");
    } catch (error) {
        console.log(error)
    }
}


/**
 * @description: Get User Details API
 */
const getUserDetailsById = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) throw badRequestError(res, "Please pass id in params !");

    let getUser = await User.findById(_id);
    if (!getUser) {
      throw notFoundError(res, "User doesn't exist with this id!");
    }

    //----- delete private data here or see model USER toJSON method for shortcut
    // getUser = getUser.toObject();
    // delete getUser.password;
    // delete getUser.auth_token;

    return okResponse(res, getUser, "User Details fetched successfully !");
  } catch (error) {
    console.log(error)
  }
};


/**
 * @description: Delete User Details API
 */
const deleteUserAccount = async (req, res) => {
  try {
    
    //CASCADE DELETE (if user deleted from database then thier tasks also deleted)
    await Task.deleteMany({ user_id: req.user._id });
    //deleting user from user collection
    const DeleteUser = await User.findByIdAndDelete(req.user._id);

    if (!DeleteUser) {
      throw notFoundError(res, "User doesn't exist with this id!");
    }

    return okResponse(res, DeleteUser, "User Deleted successfully !");
  } catch (error) {
    console.log(error);
  }
};


/**
 @description: function used to logout 
 */
const logoutUser = async (req, res) => {
    try {
        // console.log(req.user.id);
        let logoutUser = await User.updateOne({_id: req.user.id}, {auth_token : null});

        return okResponse(res, logoutUser, "User logout successfully !");
    } catch (error) {
        console.log(error)
    }
}


/**
 * @description: Fetch all Users API
 */
const allUserList = async (req, res) => {
  try {
    let allusers = await User.find()

    return okResponse(res, allusers, "All users fetched successfully !");
  } catch (error) {
    console.log(error);
  }
}


/**
 * @description: Update User detail API
 */
const updateUserDetailsById = async (req, res) => {
  try {
    if (!req.params.id) throw badRequestError(res, "Please pass id in params !");

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      throw badRequestError(res, "Invalid updates!");
    }

    // const emailExist = await User.find({
    //   _id: { $ne: req.params.id },
    //   email: req.body.email,
    // });
    // // console.log(emailExist)
    // if (emailExist) {
    //   throw badRequestError(res, "Email already registered with us.");
    // }


    const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!UpdateUser) {
      throw badRequestError(res, "User doesn't exist !");
    }

    return okResponse(res, UpdateUser, "Users details successfully !");
  } catch (error) {
    console.log(error);
  }
};


/**
 * @description: Upload user profile pic
 */
const uploadUserProfileImage = async (req, res) => {
  try {
    // console.log(req.file)
    let uploadProfileImage = await User.updateOne({_id: req.user.id}, {profile_image : req.file.buffer});
    return okResponse(res, uploadProfileImage, "User profile image uploaded successfully !");
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description: Delete user profile pic
 */
const deleteUserProfileImage = async (req, res) => {
  try {
    let deleteProfileImage = await User.updateOne({_id: req.user.id}, {profile_image : null});
    return okResponse(res, deleteProfileImage, "User profile image deleted successfully !");
  } catch (error) {
    console.log(error)
  }
}


/**
 * @description: To Fetch user profile pic
 */
const fetchUserProfileImage = async (req, res) => {
  try {
    if (!req.params.id) throw badRequestError(res, "Please pass id in params !");
    let fetchProfileImage = await User.findById(req.params.id);
    if(!fetchUserProfileImage){
      throw badRequestError(res, "User does not exist!")
    }
    res.setHeader("Content-Type", "image/jpeg")

    return okResponse(res, fetchProfileImage.profile_image, "User profile image fetched successfully !");
  } catch (error) {
    console.log(error)
  }
}



module.exports = {
  registerUser,
  UserLogin,
  getUserDetailsById,
  deleteUserAccount,
  logoutUser,
  allUserList,
  updateUserDetailsById,
  uploadUserProfileImage,
  deleteUserProfileImage,
  fetchUserProfileImage,
};