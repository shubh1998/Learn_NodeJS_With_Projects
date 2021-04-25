"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */

//----------------------------------------------CountryController Start------------------------------------------------------------------

//Import Model Here
const Country = require("../../models/Country");

//=====================================================================================

/**
 * Create Country
 * @description: function is used to create Country
 */
const createCountry = async (req, res) => {
  let data = req.body;

  if (!data.name) throw badRequestError("Please enter Country name.");

  let result = await Country.query()
    .select("*")
    .where("name", data.name);

  if (result && result != "") {
    throw badRequestError("Country Already Exist");
  }

  let registerCountry = await Country.query()
    .insert(data)
    .returning("*");

  return createdResponse(
    res,
    registerCountry,
    "Congratulations! Country Created Successfully."
  );
};

/**
 * Delete Country
 * @description: function is used to delete Country
 */
const deleteCountry = async (req, res) => {
  let Id = req.query.id;

  if (!Id) throw badRequestError("Please pass id to Delete details.");

  let getCountry = await Country.query().deleteById(Id);

  if (!getCountry) {
    throw notFoundError("Country Not Found!!");
  } else {
    return okResponse(res, getCountry, "Country Deleted Successfully!!");
  }
};

/**
 * Get List Of All Cities
 * @description: function is used to Get List Of All Cities
 */
const getAllCountries = async (req, res) => {
  let allCountries = await Country.query()
    .select("*")
    .orderBy("name");

  return okResponse(res, allCountries, "All Countries Get Successfully.");
};

module.exports = {
  createCountry,
  deleteCountry,
  getAllCountries
};

//----------------------------------------------CountryController End------------------------------------------------------------------
