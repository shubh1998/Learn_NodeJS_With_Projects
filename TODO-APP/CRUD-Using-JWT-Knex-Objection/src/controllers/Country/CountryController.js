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

    if (!data.country_name) throw badRequestError("Please enter Country name.");
    if (!data.country_code) throw badRequestError("Please enter Country code.");

    let result = await Country.query()
        .select("*")
        .where("country_name", data.country_name);

    if (result && result != "") {
        throw badRequestError("Country Already Exist");
    }

    let addCountry = await Country.query()
        .insert(data)
        .returning("*");

    return createdResponse(
        res,
        addCountry,
        "Congratulations! Country Created Successfully."
    );
};

/**
 * Delete Country
 * @description: function is used to delete Country
 */
const deleteCountry = async (req, res) => {
    let countryId = req.query.id;

    if (!countryId) throw badRequestError("Please pass id to Delete details.");

    let getCountry = await Country.query().deleteById(countryId);

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
        .orderBy("country_name", "desc");

    return okResponse(res, allCountries, "All Countries Get Successfully.");
};

module.exports = {
    createCountry,
    deleteCountry,
    getAllCountries
};

//----------------------------------------------CountryController End------------------------------------------------------------------
