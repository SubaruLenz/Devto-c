"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl p-8">
        
        <p className="text-center text-black text-2xl font-bold mb-2">
          Are you sure you want to sign out?
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-[#3b49df] px-3 py-3 text-center text-white rounded-md hover:bg-blue-700"
          >
            Yes, sign out
          </button>
        </div>
      </div>
    </div>
  );
}