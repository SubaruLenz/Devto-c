"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignOut() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f6f6f6'}}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-block md:hidden">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-gray-600">
                    <path fill="currentColor" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                  </svg>
                </button>
              </span>
              <Link href="/" className="site-logo">
                <Image className="w-12 h-10" src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="DEV Community" width={48} height={40} />
              </Link>
              <div className="hidden md:flex relative w-96">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" aria-label="Search" className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-gray-400">
                    <path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a className="md:hidden p-2 hover:bg-gray-100 rounded-md" href="/search">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-gray-600">
                  <path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
                </svg>
              </a>
              
              <span className="hidden md:flex">
                <a className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white hover:underline text-sm font-medium" href="/new">
                  Create Post
                </a>
              </span>
              
              <a href="/notifications" className="p-2 hover:bg-gray-100 rounded-md relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-gray-600">
                  <path fill="currentColor" d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                </svg>
              </a>
              
              {session && (
                <Link href="/profile" className="p-1 hover:bg-gray-100 rounded-full">
                  <Image 
                    src={session.user?.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name ?? 'User')}&background=6366f1&color=fff`}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
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