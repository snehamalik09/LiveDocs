"use client";
import { Lock } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-white">
        <Lock className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-semibold">Access Not Allowed</h1>
        <p className="text-gray-500 text-center">
          You don’t have permission to view this document.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
