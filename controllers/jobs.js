const { StatusCodes } = require("http-status-codes");

const getJobs = (req, res) => {
  res.status(StatusCodes.OK).json({
    data: {
      jobs: "all jobs"
    }
  });
};

const getJob = (req, res) => {
  res.status(StatusCodes.OK).json({
    data: {
      job: "single job"
    }
  });
};

const createJob = (req, res) => {
  res.status(StatusCodes.CREATED).json({
    data: {
      job: "create job"
    }
  });
};

const updateJob = (req, res) => {
  res.status(StatusCodes.ACCEPTED).json({
    data: {
      job: "update job"
    }
  });
};

const deleteJob = (req, res) => {
  res.status(StatusCodes.ACCEPTED).json({
    data: {
      job: "delete job"
    }
  });
};

module.exports = {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob
};
