import express from "express";
import upload from "../utils/upload.js";
import { parsePDF } from "../utils/pdfParser.js";
import { extractSkills } from "../utils/skillExtractor.js";
import { calculateATSScore } from "../utils/atsScorer.js";
import Resume from "../models/Resume.js";
import { generateSuggestions } from "../controllers/ai.controller.js";
import { generateResumePDF } from "../utils/pdfGenerator.js";

const router = express.Router();

router.post("/upload", upload.single("resume"), async (req, res) => {
  const text = await parsePDF(req.file.path);
  res.json({ extractedText: text.substring(0, 500) });
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  const { jobDescription, role, userId } = req.body;

  const resumeText = await parsePDF(req.file.path);

  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);

  const ats = calculateATSScore(resumeSkills, jobSkills);

  const versionCount = await Resume.countDocuments({ userId });

  const aiSuggestions = await generateSuggestions({
    role,
    matchedSkills: ats.matched,
    missingSkills: ats.missing,
    jobDescription,
  });

  const savedResume = await Resume.create({
    userId,
    extractedText: resumeText,
    jobDescription,
    atsScore: ats.score,
    missingSkills: ats.missing,
    role,
    version: versionCount + 1,
    suggestions: aiSuggestions
  });

  res.json({
    atsScore: ats.score,
    matchedSkills: ats.matched,
    missingSkills: ats.missing,
    suggestions: aiSuggestions,
    resumeId: savedResume._id,
  });
});



router.post("/compare", async (req, res) => {
  const { resumeId1, resumeId2 } = req.body;

  const r1 = await Resume.findById(resumeId1);
  const r2 = await Resume.findById(resumeId2);

  res.json({
    atsChange: r2.atsScore - r1.atsScore,
    missingSkillsAdded: r1.missingSkills.filter(
      skill => !r2.missingSkills.includes(skill)
    ),
    newlyMissingSkills: r2.missingSkills.filter(
      skill => !r1.missingSkills.includes(skill)
    )
  });
});   


router.get("/:id", async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json(resume);
});


router.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;

  const resumes = await Resume.find({ userId })
    .select("version atsScore role createdAt")
    .sort({ version: 1 });

  res.json(resumes);
});


router.get("/export/:id", async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  const pdfBuffer = generateResumePDF(resume);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  res.send(pdfBuffer);
});

router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({message: "Resume deleted successfully"});
  } catch (error) { 
    res.status(500).json({ message: "Deletion failed" })
  }
});

export default router;
