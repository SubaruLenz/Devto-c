"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image 
            src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" 
            alt="DEV" 
            width={48}
            height={48}
            className="h-12"
          />
          <label className="text-black mt-3 text-2xl font-bold ">Join the DEV Community </label>
          <label className="text-gray-600 mt-3 text-base">
            DEV Community is a community of 0 amazing developers 
          </label>
        </div>
        
        <div className="space-y-4 mb-6">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
          >
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
          >
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>
        
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
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center gap-2 text-base text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-base text-blue-600 hover:underline">Forgot Password ?</a>
            </div>
          </div>
          <button className="w-full bg-blue-600 px-3 py-3 text-center text-white rounded-md font-semibold hover:bg-blue-700">
            Sign in
          </button>
          <div className="flex justify-center mt-2">
            <span className="text-center text-balance text-gray-600 italic">
              By signing in, you are agreeing to be one of our cult members.
            </span>
          </div>
        </div>
        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500"></span>
          </div>
        </div>
        <p className="text-center text-base text-black mt-6">
          New to DEV Community?
          <a href="#" className="text-blue-600 hover:underline text-sm ml-1">Create account</a>
        </p>
      </div>
    </div>
  );
}

    