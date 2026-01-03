import React from "react";

const AuthPageDesign = ({ tag }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-sm ${
                i % 3 === 0
                  ? "animate-pulse"
                  : i % 3 === 1
                  ? "animate-pulse [animation-delay:0.2s]"
                  : "animate-pulse [animation-delay:0.4s]"
              }`}
              style={{
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome to Jobfit
        </h2>
        <p className="text-gray-600">
          {tag}
        </p>

        <p className="text-sm text-gray-500 font-semibold mt-5">
          Made with ❤️ by Supratim Mandal
        </p>
      </div>
    </div>
  );
};

export default AuthPageDesign;
