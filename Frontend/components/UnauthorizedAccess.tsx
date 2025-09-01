import React from "react";

const UnauthorizedAccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-md w-full text-center space-y-6 border border-gray-200">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-transparent border-t-[#28e3fc] rounded-full animate-spin"></div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            🔒 Access Denied
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            You don’t have permission to view this page. If you believe this is an error, please contact support.
          </p>
        </div>

        <div>
          <button
            className="mt-4 px-4 py-2 bg-[#28e3fc] text-white text-sm font-medium rounded hover:bg-[#22c2d8] transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
