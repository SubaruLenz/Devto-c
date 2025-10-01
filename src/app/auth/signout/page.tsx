"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignOut() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f6f6f6'}}>
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
    </div>
  );
}