// src/components/ProfileDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <Image 
          src={user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name ?? 'User')}&background=6366f1&color=fff`}
          alt="Profile"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Username/email section - no image, added margin, rounded corners */}
          <Link 
            href="/profile"
            className="block mx-2 px-3 py-3 hover:bg-blue-50 hover:underline border-b border-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </Link>

          <div className="py-1">
            <Link 
              href="/dashboard" 
              className="block mx-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:underline rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <Link 
              href="/createPost" 
              className="block mx-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:underline rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Create Post
            </Link>

            <Link 
              href="/settings" 
              className="block mx-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:underline rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 py-1 px-2">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:underline rounded-md"
            >
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
