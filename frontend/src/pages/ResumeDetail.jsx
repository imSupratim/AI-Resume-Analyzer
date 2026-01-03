import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResumeDetail = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/resume/${id}`).then((res) => setResume(res.data));
  }, []);

  if (!resume) return null;

  // const downloadPDF = () => {
  //   window.open(`http://localhost:5000/api/resume/export/${id}`);
  // };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/${id}`);
      toast.success("Resume deleted successfully");
      navigate("/history"); // or wherever your list page is
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume");
    }
  };

  const formatGeminiText = (text) => {
    if (!text) return "";

    // Split by lines
    const lines = text.split("\n");
    let formatted = [];

    lines.forEach((line, index) => {
      // Handle section headings (###)
      if (line.trim().startsWith("###")) {
        const heading = line.replace(/###/g, "").trim();
        formatted.push(
          <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
            {heading}
          </h3>
        );
      }
      // Handle bullet points (*)
      else if (line.trim().startsWith("*") && !line.trim().startsWith("**")) {
        const bulletText = line.replace(/^\*\s*/, "").trim();
        // Process bold text within bullet points
        const processedText = processBoldText(bulletText, index);
        formatted.push(
          <li key={index} className="ml-6 mb-2 text-gray-700 list-disc">
            {processedText}
          </li>
        );
      }
      // Handle regular text with bold
      else if (line.trim()) {
        const processedText = processBoldText(line.trim(), index);
        formatted.push(
          <p key={index} className="mb-3 text-gray-700 leading-relaxed">
            {processedText}
          </p>
        );
      }
      // Handle empty lines
      else {
        formatted.push(<br key={index} />);
      }
    });

    return <div className="space-y-2">{formatted}</div>;
  };

  // Helper function to process bold text (**text**)
  const processBoldText = (text, baseKey) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.replace(/\*\*/g, "");
        return (
          <span
            key={`${baseKey}-${i}`}
            className="font-semibold text-black-600 bg-gray-50 px-1 rounded"
          >
            {boldText}
          </span>
        );
      }
      return part;
    });
  };

  return (
    // <div className="p-6">
    //   <h2 className="text-xl font-bold">Resume Analysis</h2>
    //   <p>ATS Score: {resume.atsScore}</p>

    //   <h3 className="mt-4 font-semibold">Missing Skills</h3>
    //   <ul>
    //     {resume.missingSkills.map((s) => (
    //       <li key={s}>{s}</li>
    //     ))}
    //   </ul>

    //   <h3 className="mt-4 font-semibold">AI Suggestions</h3>
    //   <pre className="whitespace-pre-wrap">{resume.suggestions}</pre>
    //   <button
    //     onClick={downloadPDF}
    //     className="mt-4 bg-black text-white px-4 py-2"
    //   >
    //     Download Optimized Resume
    //   </button>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Resume Analysis
          </h2>
          <p className="text-gray-500 mt-1">
            AI-powered ATS evaluation & improvement insights
          </p>
        </div>

        {/* ATS Score Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">ATS Score</h3>
            <span
              className={`px-4 py-2 rounded-full text-lg font-bold ${
                resume.atsScore >= 80
                  ? "bg-green-100 text-green-700"
                  : resume.atsScore >= 60
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {resume.atsScore}%
            </span>
          </div>

          <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                resume.atsScore >= 80
                  ? "bg-green-500"
                  : resume.atsScore >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${resume.atsScore}%` }}
            />
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Missing Skills
          </h3>

          {resume.missingSkills.length === 0 ? (
            <p className="text-green-600 font-medium">
              🎉 No missing skills detected
            </p>
          ) : (
            <ul className="space-y-2">
              {resume.missingSkills.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-sm text-gray-700
                     bg-red-50 border border-red-100 px-3 py-2 rounded-lg"
                >
                  <span className="text-red-500 font-bold">•</span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI Suggestions – FULL WIDTH */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            AI Suggestions
          </h3>

          <div
            className="bg-gray-50 border border-gray-200 rounded-xl p-5
                  text-sm text-gray-700 whitespace-pre-wrap
                  leading-relaxed  overflow-y-auto"
          >
            {formatGeminiText(resume.suggestions)}
          </div>
        </div>

        {/*  Buttons */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleDelete}
            className="px-6 py-3 cursor-pointer bg-red-600 text-white rounded-xl
               font-semibold text-lg
               hover:bg-red-700 transition
               shadow-md hover:shadow-lg"
          >
            Delete Resume
          </button>

          {/* <button
            onClick={downloadPDF}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl
                   font-semibold text-lg
                   hover:bg-blue-700 transition
                   shadow-md hover:shadow-lg"
          >
            Download Optimized Resume
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
