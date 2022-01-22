const router = require("express").Router();
const {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobs");

router.route("/").get(getJobs).post(createJob);
router.route("/:jobId").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
