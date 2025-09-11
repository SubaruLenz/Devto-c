"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-4xl rounded-lg bg-white border border-gray-200 shadow-lg p-8 text-gray-900 flex gap-8">
        <div className="flex-1">
          <p className="text-2xl font-bold leading-8 text-gray-900 mb-6">Login</p>
          
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-600 mb-1">Username</label>
              <input 
                type="text" 
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot Password ?</a>
              </div>
            </div>
            <button className="w-full bg-blue-600 px-3 py-3 text-center text-white rounded-md font-semibold hover:bg-blue-700">
              Sign in
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don&apos;t have an account?
            <a href="#" className="text-blue-600 hover:underline text-sm ml-1">Sign up</a>
          </p>
        </div>

        <div className="w-px bg-gray-300"></div>

        <div className="flex-1 flex flex-col justify-center">
          <p className="text-center text-sm text-gray-500 mb-4">Login with social accounts</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            
            <button 
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}