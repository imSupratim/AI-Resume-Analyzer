import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

const ResumeHistory = () => {
  const [resumes, setResumes] = useState([]);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    api.get(`/resume/history/${userId}`).then((res) => setResumes(res.data));
  }, []);

  return (
    // <div className='p-10'>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    //     {resumes.map((r) => (
    //       <Link key={r._id} to={`/resume/${r._id}`}>
    //         <div className="border p-4 rounded hover:bg-gray-50">
    //           <p>Version: {r.version}</p>
    //           <p>ATS Score: {r.atsScore}</p>
    //           <p>Role: {r.role}</p>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Resume History
        </h1>

        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            {/* Icon */}
            <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
              <FileText size={36} />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No resumes analyzed yet
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 max-w-md mb-8">
              Upload your resume and get instant AI-powered ATS insights, skill
              gap analysis, and improvement suggestions.
            </p>

            {/* CTA */}
            <Link
              to="/analyze"
              className="inline-flex items-center gap-3 px-6 py-3
                 bg-blue-600 text-white rounded-xl
                 font-semibold text-lg
                 hover:bg-blue-700 transition
                 shadow-md hover:shadow-lg"
            >
              <FileText size={20} />
              Analyze Your First Resume
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((r) => (
                <Link key={r._id} to={`/resume/${r._id}`}>
                  <div
                    className="group bg-white rounded-2xl border border-gray-200
                       p-6 shadow-sm hover:shadow-xl
                       hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Version {r.version}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          r.atsScore >= 80
                            ? "bg-green-100 text-green-700"
                            : r.atsScore >= 60
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.atsScore}%
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                      {r.role} Developer
                    </h3>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">ATS Score</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            r.atsScore >= 80
                              ? "bg-green-500"
                              : r.atsScore >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${r.atsScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeHistory;
