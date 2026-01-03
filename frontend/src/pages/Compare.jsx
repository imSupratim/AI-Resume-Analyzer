import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";

const Compare = () => {
  const [resumes, setResumes] = useState([]);
  const [resume1, setResume1] = useState("");
  const [resume2, setResume2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  // 🔹 Fetch resume history
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.get(`/resume/history/${userId}`, {
        withCredentials: true,
      });
      setResumes(res.data);
    };

    if (userId) fetchHistory();
  }, [userId]);

  // 🔹 Compare handler
  const handleCompare = async () => {
    if (!resume1 || !resume2) {
      alert("Select two resumes");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        `/resume/compare`,
        {
          resumeId1: resume1,
          resumeId2: resume2,
        },
        { withCredentials: true }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="max-w-3xl mx-auto p-6">
    //   <h1 className="text-2xl font-bold mb-6">
    //     Compare Resume Versions
    //   </h1>

    //   {/* SELECT RESUMES */}
    //   <div className="grid grid-cols-2 gap-4">
    //     <select
    //       value={resume1}
    //       onChange={(e) => setResume1(e.target.value)}
    //       className="border p-2 rounded"
    //     >
    //       <option value="">Select Old Resume</option>
    //       {resumes.map((r) => (
    //         <option key={r._id} value={r._id}>
    //           Version {r.version} – ATS {r.atsScore}%
    //         </option>
    //       ))}
    //     </select>

    //     <select
    //       value={resume2}
    //       onChange={(e) => setResume2(e.target.value)}
    //       className="border p-2 rounded"
    //     >
    //       <option value="">Select New Resume</option>
    //       {resumes.map((r) => (
    //         <option key={r._id} value={r._id}>
    //           Version {r.version} – ATS {r.atsScore}%
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <button
    //     onClick={handleCompare}
    //     className="mt-4 bg-black text-white px-6 py-2 rounded"
    //   >
    //     {loading ? "Comparing..." : "Compare"}
    //   </button>

    //   {/* RESULT */}
    //   {result && (
    //     <div className="mt-6 space-y-4">
    //       <h2 className="text-xl font-semibold">
    //         ATS Change:{" "}
    //         <span
    //           className={
    //             result.atsChange >= 0
    //               ? "text-green-600"
    //               : "text-red-600"
    //           }
    //         >
    //           {result.atsChange >= 0 ? "+" : ""}
    //           {result.atsChange}%
    //         </span>
    //       </h2>

    //       <div>
    //         <h3 className="font-semibold text-green-700">
    //           Skills Improved
    //         </h3>
    //         {result.missingSkillsAdded.length === 0
    //           ? "No improvements"
    //           : (
    //             <ul className="list-disc pl-5">
    //               {result.missingSkillsAdded.map((s, i) => (
    //                 <li key={i}>{s}</li>
    //               ))}
    //             </ul>
    //           )}
    //       </div>

    //       <div>
    //         <h3 className="font-semibold text-red-700">
    //           Newly Missing Skills
    //         </h3>
    //         {result.newlyMissingSkills.length === 0
    //           ? "None"
    //           : (
    //             <ul className="list-disc pl-5">
    //               {result.newlyMissingSkills.map((s, i) => (
    //                 <li key={i}>{s}</li>
    //               ))}
    //             </ul>
    //           )}
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
          Compare Resume Versions
        </h1>

        {/* SELECT RESUMES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            value={resume1}
            onChange={(e) => setResume1(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50
                   px-4 py-3 text-sm font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
          >
            <option value="">📄 Select Old Resume</option>
            {resumes.map((r) => (
              <option key={r._id} value={r._id}>
                Version {r.version} – ATS {r.atsScore}%
              </option>
            ))}
          </select>

          <select
            value={resume2}
            onChange={(e) => setResume2(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50
                   px-4 py-3 text-sm font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
          >
            <option value="">✨ Select New Resume</option>
            {resumes.map((r) => (
              <option key={r._id} value={r._id}>
                Version {r.version} – ATS {r.atsScore}%
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompare}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600
                 text-white py-3 rounded-xl text-lg font-semibold
                 hover:scale-[1.02] hover:shadow-lg transition
                 disabled:opacity-60"
        >
          {loading ? "Comparing..." : "Compare Resumes"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                ATS Score Change
              </h2>
              <p
                className={`text-4xl font-extrabold mt-2 ${
                  result.atsChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {result.atsChange >= 0 ? "+" : ""}
                {result.atsChange}%
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-700 mb-3">
                  ✅ Skills Improved
                </h3>
                {result.missingSkillsAdded.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    No improvements detected
                  </p>
                ) : (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {result.missingSkillsAdded.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-bold text-red-700 mb-3">
                  ⚠️ Newly Missing Skills
                </h3>
                {result.newlyMissingSkills.length === 0 ? (
                  <p className="text-sm text-gray-600">No missing skills</p>
                ) : (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {result.newlyMissingSkills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
