import PDFDocument from "pdfkit";

export const generateResumePDF = (resume) => {
  const doc = new PDFDocument();
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  doc.fontSize(18).text("Optimized Resume", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`ATS Score: ${resume.atsScore}`);
  doc.moveDown();

  doc.text("Missing Skills:");
  resume.missingSkills.forEach(skill => doc.text(`• ${skill}`));
  doc.moveDown();

  doc.text("AI Suggestions:");
  doc.text(resume.suggestions);

  doc.end();

  return Buffer.concat(buffers);
};
