const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const Job = require("../models/Job");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.name = req.user.name;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({
    job,
  });
};

//gets job just associated with curr user
const getAllJobs = async (req, res) => {
  //change to empty args for all jobs
  const jobs = await Job.find().sort("_id");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
  });

  if (!job) {
    throw new NotFoundError(`No job with Id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
  const {
    body: { title, status, priority },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!title === "" || status === "" || priority === "") {
    throw new BadRequestError("Fields cannot be empty");
  }
  console.log(title, status, priority);

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json("Job deleted");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
