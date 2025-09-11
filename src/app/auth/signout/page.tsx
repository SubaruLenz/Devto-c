"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white border border-gray-200 shadow-lg p-8 text-gray-900">
        <p className="text-2xl font-bold leading-8 text-gray-900 mb-6 text-center">Sign Out</p>
        
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to sign out?
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full bg-red-600 px-3 py-3 text-center text-white rounded-md font-semibold hover:bg-red-700"
          >
            Sign Out
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}