"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */
//----------------------------------------------UserController Start------------------------------------------------------------------

//Import Model Here
const Job = require("../../models/Job");

//=====================================================================================

/**
 * Create Job
 * @description: function is used to create Job
 */
const createJob = async (req, res) => {
  let data = req.body;

  if (!data.name) throw badRequestError("Please enter job name.");

  let result = await Job.query()
    .select("*")
    .where("name", data.name);

  if (result && result != "") {
    throw badRequestError("Job Already Exist");
  }

  let registerJob = await Job.query()
    .insert(data)
    .returning("*");

  return createdResponse(
    res,
    registerJob,
    "Congratulations! Job Created Successfully."
  );
};

/**
 * Update Person
 * @description: function is used to update person Info
 */
const updateJob = async (req, res) => {
  let Id = req.query.id;
  let data = req.body;

  let result = await Job.query()
    .select("*")
    .where("name", data.name)
    .whereNot("id", Id)
    .first();

  if (result) {
    throw badRequestError("this Job Already Exist");
  }

  let jobUpdate = await Job.query()
    .update(data)
    .where("id", Id)
    .returning("*");

  if (!jobUpdate) throw badRequestError("Something Went Wrong");

  return okResponse(res, jobUpdate, "Job Updated Successfully.");
};

/**
 * Delete Person
 * @description: function is used to delete person
 */
const deleteJob = async (req, res) => {
  let Id = req.query.id;

  if (!Id) throw badRequestError("Please pass id to Delete Job.");

  let getJob = await Job.query().deleteById(Id);

  if (!getJob) {
    throw notFoundError("Job Not Found!!");
  } else {
    return okResponse(res, getJob, "Job Deleted Successfully!!");
  }
};

/**
 * Get List Of All Jobs
 * @description: function is used to Get List Of All Jobs
 */
const getAllJobs = async (req, res) => {
  let allJobs = await Job.query()
    .select("*")
    .orderBy("created_at");

  return okResponse(res, allJobs, "All Jobs Get Successfully.");
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs
};

//----------------------------------------------UserController End------------------------------------------------------------------
