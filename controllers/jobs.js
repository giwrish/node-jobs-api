const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../error");
const Job = require("../model/Job");

const getJobs = async (req, res) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ jobs, total: jobs.length });
};

const getJob = async (req, res) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFound(`Job does not exist with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { title, company } = req.body;
  if (!(title && company)) {
    throw new BadRequest("missing title or company");
  }
  const { userId } = req.user;
  const job = await Job.create({ ...req.body, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  console.log(req.user);
  const {
    user: { userId },
    params: { jobId },
    body: { company, title, status }
  } = req;

  if (company === "" || title === "" || status === "") {
    throw new BadRequest("One of the body attributes is empty");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, userId: userId },
    { company, title, status }
  );

  if (!job) {
    throw new NotFound(
      `Job does not exist with id ${jobId} created by user ${userId}`
    );
  }
  res.status(StatusCodes.NO_CONTENT).json();
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { jobId }
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFound(
      `Job does not exist with id ${jobId} created by user ${userId}`
    );
  }

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob
};
