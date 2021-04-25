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

    if (!data.city_name) throw badRequestError("Please enter City name.");
    if (!data.state_id) throw badRequestError("Please enter State Id.");
    if (!data.country_id) throw badRequestError("Please enter Country Id.");


    let result = await City.query()
        .select("*")
        .where("city_name", data.city_name);

    if (result && result != "") throw badRequestError("City Already Exist");

    let addCity = await City.query()
        .insert(data)
        .returning("*");

    return createdResponse(
        res,
        addCity,
        "Congratulations! City Created Successfully."
    );
};

/**
 * Delete City
 * @description: function is used to delete City
 */
const deleteCity = async (req, res) => {
    let cityId = req.query.id;

    if (!cityId) throw badRequestError("Please pass id to Delete city details.");

    let getCity = await City.query().deleteById(cityId);

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
        .eager("[city_state_relation, city_country_relation]")
        .modifyEager("city_state_relation", builder => {
            builder.select("id", "state_name");
        })
        .modifyEager("city_country_relation", builder => {
            builder.select("id", "country_name");
        })
        .orderBy("city_name", "desc");

    return okResponse(res, allCities, "All Cities Get Successfully.");
};

/**
 * get cities by state_Id
 * @description: function is used to get list of all cities by their perspective state_Id
 */
const getCitiesByStateId = async (req, res) => {
    let stateId = req.params.id;

    let getCitiesbyState = await City.query()
        .select("*")
        .eager("[city_state_relation]")
        .modifyEager("city_state_relation", builder => {
            builder.select("id", "state_name");
        })
        .orderBy("city_name", "desc")
        .where("state_id", stateId);

    return okResponse(res, getCitiesbyState, "List Of Cities By State Id Get Successfully.");
}

module.exports = {
    createCity,
    deleteCity,
    getAllCities,
    getCitiesByStateId
};

//----------------------------------------------CityController End------------------------------------------------------------------
