const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },

    status: {
      type: String,
      enum: ["Stuck", "Working On It", "Waiting For Review", "Done", "Paused"],
      required: [true, "Please provide status name"],
      maxLength: 20,
    },
    priority: {
      type: String,
      required: [true, "Please provide priority value"],
      enum: ["Low", "Medium", "High"],
      maxLength: 20,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    name: {
      type: String,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
