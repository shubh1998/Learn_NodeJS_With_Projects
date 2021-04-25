const User = require("../../models/User")
const validator = require("validator");
const crypto = require("crypto")
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @description: Function is used to register a user 
 */
const registerUser = async (req, res) => {
    try{
        let token = crypto.randomBytes(64).toString("hex");
        let requestData = new User(req.body);
        requestData.email_verification_token = token;

        if (!validator.isEmail(requestData.email)) throw badRequestError(res, "Invalid Email !");

        let userExist = await User.findOne({email: requestData.email})

        if(userExist){
            throw badRequestError(res, "User already exist with this email id");
        }

        let link = "http://localhost:3000/api/v1/verifyEmail?token=" + token;

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "youremail@gamil.com",
            pass: "yourpassword",
          },
        });

        const mailOptions = {
          from: "youremail@gamil.com", // sender address
          to: requestData.email, // list of receivers
          subject: "verify Email", // Subject line
          text: link,
          html: "<p>Click on Verification Link to verify email</p>", // plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) console.log("error");
          else console.log(info);
        });

        requestData.password = await bcryptjs.hash(requestData.password, 8);

        let saveUserData = await requestData.save();

        return okResponse(res, saveUserData, "User registered successfully !");
    } catch(error){
        console.log(error)
    }
}

/**
 @description: function used to login user 
 */
const loginUser = async (req, res) => {
    try {
        let data = req.body;

        if (!data.email) throw badRequestError(res, "Enter email.");
        if (!validator.isEmail(data.email)) throw badRequestError(res, "Enter valid email.");
        if (!data.password) throw badRequestError(res, "Enter your password.");

        let user = await User.findOne({ email: req.body.email })

        if(user == null){
            throw badRequestError(res, "User not exist.");
        }

        if(user.user_type == "BUSINESSUSER"){
            if (user.is_email_verified == false) {
                throw badRequestError(res, "Email not verified yet please verify your email first");
            }
        }else{
            if (user.user_approved == false) {
                throw badRequestError(res, "User Profile not approved yet!");
            }
        }

        if (user.user_status == false) {
          throw badRequestError(res, "Your access is blocked by admin.");
        }

        let pass = await bcryptjs.compare(data.password, user.password);

        if(!pass){
             throw badRequestError(res, "Invalid password.");
        }

        /****** Generate authenticated data and its auth_token *****/
        let authToken = await jwt.sign({id: user._id,role: user.user_type},'xIMEE1vdvlvTjac1tGyiJHZusIFBtl');
        // console.log(authToken)
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('AuthToken', authToken);
        res.setHeader('Access-Control-Expose-Headers', 'AuthToken');

        await User.updateOne({ _id: user._id }, { auth_token: authToken });

        let responseData = {
            '_id': user._id,
            'name': user.name,
            'email': user.email,
        }

        return okResponse(res, responseData, "User Logged In successfully !");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to logout 
 */
const logoutUser = async (req, res) => {
    try {

        console.log(req.user.id);
        let logoutUser = await User.updateOne({_id: req.user.id}, {auth_token : null});

        return okResponse(res, logoutUser, "User registered successfully !");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to verify email 
 */
const verifyEmail = async (req, res) => {
    try {
        if (!req.query.token) throw badRequestError(res, "token required");

        let user = await User.findById({ email_verification_token: req.query.token });

        if(user == null){
            throw badRequestError(res, "link Expired");
        }

        await User.updateOne({ _id: user._id }, { email_verification_token :null});

        return okResponse(res, 1, "Email Verified Successfully");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to approve User 
 */
const approveAcccountOfCustomer = async (req, res) => {
    try {
        if (!req.query.id) throw badRequestError(res, "id required!");

        let user = await User.findById({ _id: req.query.id });

        if(user == null){
            throw badRequestError(res, "user not found");
        }

        await User.updateOne({ _id: req.query.id }, { user_approved: true });

        return okResponse(res, 1, "Customer profile approved Successfully");
    } catch (error) {
        console.log(error)
    }
}


/**
 @description: function used to update User Profile 
 */
const updateUserProfie = async (req, res) => {
    try {
        let requestData = req.body
        requestData._id = req.user.id
        if (!requestData._id) throw badRequestError(res, "id required");

        let userExist = await User.findById({ _id: requestData._id });

        if (userExist == null)
          throw badRequestError(res, "user not found");

        let updateUserProfieData = await User.updateOne(requestData);

        return okResponse(res, updateUserProfieData, "User updated successfully !");
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  approveAcccountOfCustomer,
  updateUserProfie,
};