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
            Don't have an account?
            <a href="#" className="text-blue-600 hover:underline text-sm ml-1">Sign up</a>
          </p>
        </div>

        <div className="w-px bg-gray-300"></div>

        <div className="flex-1 flex flex-col justify-center">
          <p className="text-center text-sm text-gray-500 mb-4">Login with social accounts</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-gray-600">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
              </svg>
              Continue with Google
            </button>
            
            <button 
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-gray-600">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}