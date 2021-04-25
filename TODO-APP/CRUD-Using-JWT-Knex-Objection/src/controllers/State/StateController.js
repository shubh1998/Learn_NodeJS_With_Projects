"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */

//----------------------------------------------CityController Start------------------------------------------------------------------

//Import Model Here
const State = require("../../models/State");

//=====================================================================================

/**
 * Create State
 * @description: function is used to create State
 */
const createState = async (req, res) => {
    let data = req.body;

    if (!data.state_name) throw badRequestError("Please enter State name.");
    if (!data.country_id) throw badRequestError("Please enter Country Id.");

    let result = await State.query()
        .select("*")
        .where("state_name", data.state_name);

    if (result && result != "") throw badRequestError("State Already Exist");

    let addState = await State.query()
        .insert(data)
        .returning("*");

    return createdResponse(
        res,
        addState,
        "Congratulations! State Created Successfully."
    );
};

/**
 * Delete State
 * @description: function is used to delete State
 */
const deleteState = async (req, res) => {
    let stateId = req.query.id;

    if (!stateId) throw badRequestError("Please pass id to Delete State details.");

    let getState = await State.query().deleteById(stateId);

    if (!getState) {
        throw notFoundError("State Not Found!!");
    } else {
        return okResponse(res, getState, "State Deleted Successfully!!");
    }
};

/**
 * Get List Of All States
 * @description: function is used to Get List Of All States
 */
const getAllStates = async (req, res) => {
    let allStates = await State.query()
        .select("*")
        .eager("[state_country_relation]")
        .modifyEager("state_country_relation", builder => {
            builder.select("id", "country_name");
        })
        .orderBy("state_name", "desc");

    return okResponse(res, allStates, "All States Get Successfully.");
};

/**
 * get states by country_Id
 * @description: function is used to get list of all states by their perspective country_Id
 */
const getStatesByCountryId = async (req, res) => {
    let countryId = req.params.id;

    let getStatesbyCountry = await State.query()
        .select("*")
        .eager("[state_country_relation]")
        .modifyEager("state_country_relation", builder => {
            builder.select("id", "country_name");
        })
        .orderBy("state_name", "desc")
        .where("country_id", countryId);

    return okResponse(res, getStatesbyCountry, "List Of States By Country Id Get Successfully.");
}

module.exports = {
    createState,
    deleteState,
    getAllStates,
    getStatesByCountryId
};

//----------------------------------------------CityController End------------------------------------------------------------------
