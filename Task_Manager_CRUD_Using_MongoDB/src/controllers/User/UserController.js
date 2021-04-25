const User = require("../../models/User")
const validator = require("validator");

/**
 * @description: Function is used to register a user 
 */
const registerUser = async (req, res) => {
    try{
        let requestData = new User(req.body)

        if (!validator.isEmail(requestData.email)) throw badRequestError(res, "Invalid Email !");
        if (requestData.age < 0) throw badRequestError(res, "Age must be a postive number");

        let saveUserData = await requestData.save();

        return okResponse(res, saveUserData, "User registered successfully !");
    } catch(error){
        console.log(error)
    }
}


module.exports = {
  registerUser,
};