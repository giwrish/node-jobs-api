const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Job title"],
      maxlength: 50
    },

    company: {
      type: String,
      required: [true, "Please provide the company name"],
      maxlength: 50
    },
    status: {
      type: String,
      enum: ["Applied", "In Review", "Interview", "Declined", "Offer Accepted"],
      default: "Applied"
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide created by"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
