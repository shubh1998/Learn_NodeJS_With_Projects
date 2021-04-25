"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */
//----------------------------------------------UserController Start------------------------------------------------------------------

//Import Model Here
const Person = require("../../models/Person");

//=====================================================================================

/**
 * Create Person
 * @description: function is used to create person
 */
const createPerson = async (req, res) => {
  let data = req.body;

  if (!data.name) throw badRequestError("Please enter your name.");
  if (!data.email) throw badRequestError("Please enter your email.");
  if (!data.cityId) throw badRequestError("Please enter your cityId.");
  if (!data.countryId) throw badRequestError("Please enter your countryId.");
  if (!data.age) throw badRequestError("Please enter your age.");

  let result = await Person.query()
    .select("*")
    .where("name", data.email);

  if (result && result != "") {
    throw badRequestError("Person With This EmailId Already Exist");
  }

  let registerUser = await Person.query()
    .insert(data)
    .returning("*");

  return createdResponse(
    res,
    registerUser,
    "Congratulations! User Created Successfully."
  );
};

/**
 * Get Person Details By Id
 * @description: function is used to Get Person Details By Id
 */
const getPersonDetailById = async (req, res) => {
  let Id = req.query.id;

  if (!Id) throw badRequestError("Please pass id to get details.");

  let getUser = await Person.query()
    .select("*")
    .where("pid", Id);

  if (!getUser) {
    throw notFoundError("User Data Not Found!!");
  } else {
    return okResponse(res, getUser, "User Data Get Successfully!!");
  }
};

/**
 * Update Person
 * @description: function is used to update person Info
 */
const updatePerson = async (req, res) => {
  let Id = req.query.id;
  let data = req.body;

  let result = await Person.query()
    .select("*")
    .where("email", data.email)
    .whereNot("pid", Id)
    .first();

  if (result) {
    throw badRequestError("Account with this emailId Already");
  }

  let updateUser = await Person.query()
    .update(data)
    .where("pid", Id)
    .returning("*");

  if (!updateUser) throw badRequestError("Something Went Wrong");

  return okResponse(
    res,
    updateUser,
    "Congratulations! User Updated Successfully."
  );
};

/**
 * Delete Person
 * @description: function is used to delete person
 */
const deletePerson = async (req, res) => {
  let Id = req.query.id;

  if (!Id) throw badRequestError("Please pass id to Delete details.");

  let getUser = await Person.query()
    .delete()
    .where("pid", Id);

  if (!getUser) {
    throw notFoundError("User Data Not Found!!");
  } else {
    return okResponse(res, getUser, "User Data Deleted Successfully!!");
  }
};

/**
 * Get List Of All Person
 * @description: function is used to Get List Of All Person
 */
const getAllPersons = async (req, res) => {
  let allUsers = await Person.query()
    .select("*")
    .orderBy("created_at");

  return okResponse(res, allUsers, "All User Get Successfully.");
};

module.exports = {
  createPerson,
  getPersonDetailById,
  updatePerson,
  deletePerson,
  getAllPersons
};

//----------------------------------------------UserController End------------------------------------------------------------------
