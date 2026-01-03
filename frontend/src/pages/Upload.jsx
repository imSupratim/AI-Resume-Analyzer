import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const Upload = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("frontend");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription) {
      toast.error("Please upload resume and job description");
      return;
    }
    const toastId = toast.loading("Analyzing resume...");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("role", role);
    formData.append("userId", userId);

    try {
      setLoading(true);

      const res = await api.post(`/resume/analyze`, formData, {
        withCredentials: true,
      });

      toast.success("Resume analyzed successfully!", {
        id: toastId,
      });

      // ✅ redirect to result page
      navigate(`/resume/${res.data.resumeId}`);
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed. Try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="max-w-3xl mx-auto p-6">
    //   <h1 className="text-3xl font-bold mb-6">
    //     Upload Resume for Analysis
    //   </h1>

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     {/* RESUME */}
    //     <input
    //       type="file"
    //       accept=".pdf"
    //       onChange={(e) => setResume(e.target.files[0])}
    //       className="block"
    //     />

    //     {/* JOB DESCRIPTION */}
    //     <textarea
    //       rows="6"
    //       placeholder="Paste job description here..."
    //       value={jobDescription}
    //       onChange={(e) => setJobDescription(e.target.value)}
    //       className="w-full border p-2 rounded"
    //     />

    //     {/* ROLE */}
    //     <select
    //       value={role}
    //       onChange={(e) => setRole(e.target.value)}
    //       className="border p-2 rounded"
    //     >
    //       <option value="frontend">Frontend</option>
    //       <option value="backend">Backend</option>
    //       <option value="data">Data</option>
    //     </select>

    //     <button
    //       type="submit"
    //       className="bg-black text-white px-6 py-2 rounded"
    //     >
    //       {loading ? "Analyzing..." : "Analyze Resume"}
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-800 tracking-tight">
          Upload Resume for Analysis
        </h1>
        <p className="text-gray-500 mb-8">
          Upload your resume and compare it against the job description to get
          an ATS score.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* RESUME */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Resume (PDF only)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-600
                     hover:file:bg-blue-100
                     text-sm text-gray-500 cursor-pointer"
            />
          </div>

          {/* JOB DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Job Description
            </label>
            <textarea
              rows="6"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 resize-none"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Target Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 bg-white"
            >
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="data">Data Analyst</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="uiux">UI/UX Designer</option>
              <option value="mobile">Mobile App Developer</option>
              <option value="devops">DevOps Engineer</option>
              <option value="cloud">Cloud Engineer</option>
              <option value="ml">Machine Learning Engineer</option>
              <option value="ai">AI Engineer</option>
              <option value="security">Cybersecurity Specialist</option>
              <option value="qa">QA / Test Engineer</option>
              <option value="pm">Project Manager</option>
              <option value="product">Product Manager</option>
              <option value="database">Database Administrator</option>
              <option value="system">System Administrator</option>
              <option value="game">Game Developer</option>
              <option value="blockchain">Blockchain Developer</option>
              <option value="research">Research Scientist</option>
              <option value="support">Technical Support Engineer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl
                   font-semibold text-lg
                   hover:bg-blue-700 transition
                   disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
