"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-center">Sign Out</h1>
        <p className="text-center text-gray-600">
          Are you sure you want to sign out?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex-1 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Sign Out
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 rounded border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}