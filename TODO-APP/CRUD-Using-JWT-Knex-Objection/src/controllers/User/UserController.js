"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */
//----------------------------------------------UserController Start------------------------------------------------------------------

//Import Dependency(3rd party) Module
const validator = require('validator');
const chalk = require("chalk");
const bcrypt = require("bcrypt");

//Import Model Here
const User = require("../../models/User");

//=====================================================================================

/**
 * Create User
 * @description: function is used to create User
 */
const createUser = async (req, res) => {
    let data = req.body;
    data.is_active = true;
    data.user_type = 'USER'

    if (!data.name) throw badRequestError("Please enter your name.");
    if (!data.email) throw badRequestError("Please enter your email.");
    if (!data.password) throw badRequestError("Please enter your password.");
    if (!data.address) throw badRequestError("Please enter your address.");
    if (!data.city_id) throw badRequestError("Please enter your city_id.");
    if (!data.state_id) throw badRequestError("Please enter your state_id.");
    if (!data.country_id) throw badRequestError("Please enter your country_id.");
    if (!data.mobile) throw badRequestError("Please enter your mobile.");
    if (!validator.isEmail(data.email)) throw badRequestError("please enter valid email id.");

    let result_1 = await User.query()
        .select("*")
        .where("email", data.email);

    let result_2 = await User.query()
        .select("*")
        .where("mobile", data.mobile);

    if (result_1) {
        throw badRequestError("User With This EmailId Already Exist.");
    }

    if (result_2) {
        throw badRequestError("User With This Mobile Number Already Exist.");
    }

    let registerUser = await User.query()
        .insert(data)
        .returning("*");
    
    let returnData = {
        'id': registerUser.id,
        'name': registerUser.name,
        'email': registerUser.email,
        'mobile': registerUser.mobile,
        'user_type': registerUser.user_type,
        'profile_pic': registerUser.profile_pic,
        'gender': registerUser.gender
    }

    return createdResponse(
        res,
        returnData,
        "Congratulations! User Created Successfully."
    );
};


/**
 * Login API
 * @description: fuction is used to do login
 */
const UserLogin = async (req, res) => {
    let data = req.body;

    /** Validate for the empty fields */
    if(!data.email) throw badRequestError("Please enter email.");
    if (!validator.isEmail(data.email)) throw badRequestError("Please enter a valid email.");
    if (!data.password) throw badRequestError("Please enter password.");
    if(data.password.length < 5) throw badRequestError("Minimum length of password should be 5");
    if(data.password.length > 32) throw badRequestError("Maximum length of password should be 32");

    /** Execute Query to fetch the user */
    let user = await User.query()
        .where('email', data.email)
        .first();

    // console.log(user);

    /* email not match */
    if(!user){
        throw badRequestError("Please enter valid credentials.");
    }

    /* check user is_active or not */
    if(user.isActive == false){
        throw badRequestError("You are blocked by admin.");
    }

    /* Check Password matched OR not */
    if(!await user.comparePassword(data.password)) {
        throw badRequestError("Please enter valid password.");
    }

    /****** Generate authenticated data and its auth_token *****/
    let authToken = await user.getJWT();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('AuthToken', authToken);
    res.setHeader('Access-Control-Expose-Headers', 'AuthToken');
    /******-----------------------------------------------*****/
    let token = await User.query()
      .where("id", user.id)
      .update({
        auth_token: authToken
      })
      .returning("*");
    
    //delete password
    delete user.password;

    let returnData = {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'mobile': user.mobile,
        'role': 'USER',
        'profile_pic': user.profile_pic,
        'gender': user.gender
    }

    return okResponse(res, {
    ...returnData,
    }, "Login Successful");
}

/**
 * Logout API
 * @description: function is used to do Logout
 */
const UserLogout = async (req, res) => {
    let logout = await User.query()
        .patch({auth_token: null})
        .where('id', req.user.id);
    
    return okResponse(res, {
        logout,
    }, "Logged out successfully.");
}


/**
 * Get User Details By Id
 * @description: function is used to Get User Details By Id
 */
const getUserDetailById = async (req, res) => {
    let userId = req.query.id;

    if (!userId) throw badRequestError("Please pass userId to get details.");

    let getUser = await User.query()
        .select("name", "email", "mobile", "gender", "address", "city_id", "state_id", "country_id", "is_active", "user_type")
        .eager("[user_city_relation , user_state_relation , user_country_relation]")
        .modifyEager("user_city_relation", builder => {
            builder.select("id", "city_name");
        })
        .modifyEager("user_state_relation", builder => {
            builder.select("id", "state_name");
        })
        .modifyEager("user_country_relation", builder => {
            builder.select("id", "country_name");
        })
        .where("id", userId);

    if (!getUser) {
        throw notFoundError("User Data Not Found!!");
    } else {
        return okResponse(res, getUser, "User Data Get Successfully!!");
    }
};

/**
 * Update User
 * @description: function is used to update User Info
 */
const updateUser = async (req, res) => {
    let userId = req.query.id;
    let data = req.body;

    if(!userId){
        throw badRequestError("Please pass userId to update details.");
    }

    let result_1 = await User.query()
        .select("*")
        .where("email", data.email)
        .whereNot("id", userId)
        .first();

    let result_2 = await User.query()
        .select("*")
        .where("mobile", data.mobile)
        .whereNot("id", userId)
        .first();

    if (result_1) {
        throw badRequestError("Account with this emailId Already Registered.");
    }

    if (result_2) {
        throw badRequestError("Account with this Mobile Number Already Registered.");
    }

    data.password = await bcrypt.hash(data.password, 10);

    let updateUser = await User.query()
        .update(data)
        .where("id", userId)
        .returning("*");

    if (!updateUser) throw badRequestError("Something Went Wrong");

    return okResponse(
        res,
        1,
        "Congratulations! User Updated Successfully."
    );
};

/**
 * Delete User
 * @description: function is used to delete User
 */
const deleteUser = async (req, res) => {
    let userId = req.query.id;

    if (!userId) throw badRequestError("Please pass userId to Delete details.");

    let getUser = await User.query()
        .delete()
        .where("id", userId);

    if (!getUser) {
        throw notFoundError("User Data Not Found!!");
    } else {
        return okResponse(res, getUser, "User Data Deleted Successfully!!");
    }
};

/**
 * Get List Of All User
 * @description: function is used to Get List Of All User
 */
const getAllUsers = async (req, res) => {
    let allUsers = await User.query()
        .select("name", "email", "mobile", "gender", "address", "city_id", "state_id", "country_id", "is_active", "user_type")
        .eager("[user_city_relation , user_state_relation , user_country_relation]")
        .modifyEager("user_city_relation", builder => {
            builder.select("id", "city_name");
        })
        .modifyEager("user_state_relation", builder => {
            builder.select("id", "state_name");
        })
        .modifyEager("user_country_relation", builder => {
            builder.select("id", "country_name");
        })
        .orderBy("created_at", "desc");

    return okResponse(res, allUsers, "All User Get Successfully.");
};

module.exports = {
  createUser,
  UserLogin,
  UserLogout,
  getUserDetailById,
  updateUser,
  deleteUser,
  getAllUsers
};

//----------------------------------------------UserController End------------------------------------------------------------------
