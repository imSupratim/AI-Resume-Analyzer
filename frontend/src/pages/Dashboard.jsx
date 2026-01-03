import { useEffect, useState } from "react";
import api from "../api/api";
import ATSChart from "../components/ATSChart";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    api.get(`/resume/history/${userId}`).then((res) => setResumes(res.data));
  }, []);

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Resume Dashboard</h1>

    //   <ATSChart data={resumes} />

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

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {resumes.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Upload Your First Resume
            </h2>

            <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
              Start your journey toward a better resume. Analyze ATS score and
              get AI-powered suggestions.
            </p>

            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3
                       bg-blue-600 text-white rounded-xl
                       hover:bg-blue-700 transition shadow-md font-semibold"
            >
              <FileText className="w-5 h-5" />
              Upload Resume
            </Link>
          </div>
        ) : (
          // NORMAL DASHBOARD
          <>
            <div className="flex justify-between items-center mb-10 px-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 tracking-tight">
                Resume Dashboard
              </h1>

              <Link
                to="/analyze"
                className="flex gap-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
              >
                <FileText /> Analyze
              </Link>
            </div>

            <div className="mb-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
              <ATSChart data={resumes} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumes.map((r) => (
                <Link key={r._id} to={`/resume/${r._id}`}>
                  <div className="relative bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {r.version}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
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

                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600">
                        {r.role}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500 gap-3">
                        <span className="font-medium">ATS Score</span>

                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-full rounded-full ${
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

export default Dashboard;
