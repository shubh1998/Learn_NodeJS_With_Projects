"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */

//----------------------------------------------CityController Start------------------------------------------------------------------

//Import Model Here
const City = require("../../models/City");

//=====================================================================================

/**
 * Create City
 * @description: function is used to create city
 */
const createCity = async (req, res) => {
  let data = req.body;

  if (!data.name) throw badRequestError("Please enter City name.");

  let result = await City.query()
    .select("*")
    .where("name", data.name);

  if (result && result != "") throw badRequestError("City Already Exist");

  let registerCity = await City.query()
    .insert(data)
    .returning("*");

  return createdResponse(
    res,
    registerCity,
    "Congratulations! City Created Successfully."
  );
};

/**
 * Delete City
 * @description: function is used to delete City
 */
const deleteCity = async (req, res) => {
  let Id = req.query.id;

  if (!Id) throw badRequestError("Please pass id to Delete details.");

  let getCity = await City.query().deleteById(Id);

  if (!getCity) {
    throw notFoundError("City Not Found!!");
  } else {
    return okResponse(res, getCity, "City Deleted Successfully!!");
  }
};

/**
 * Get List Of All Cities
 * @description: function is used to Get List Of All Cities
 */
const getAllCities = async (req, res) => {
  let allCities = await City.query()
    .select("*")
    .orderBy("name");

  return okResponse(res, allCities, "All Cities Get Successfully.");
};

module.exports = {
  createCity,
  deleteCity,
  getAllCities
};

//----------------------------------------------CityController End------------------------------------------------------------------
