import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  extractedText: String,
  jobDescription: String,
  atsScore: Number,
  missingSkills: [String],
  role: String,
  version: Number,
  suggestions: String
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
