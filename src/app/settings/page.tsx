"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { data: profile, refetch } = api.user.getProfile.useQuery(undefined, {
    enabled: !!session?.user,
  });
  
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => setShowSuccess(false), 3000);
      void refetch();
    },
    onError: () => {
      setIsSubmitting(false);
      setShowError(true);
      setShowSuccess(false);
      setTimeout(() => setShowError(false), 3000);
    },
  });

  if (status === "loading") {
    return <div className="min-h-screen" style={{backgroundColor: '#f6f6f6'}} />;
  }

  if (!session?.user) {
    redirect("/");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      website_url: formData.get("website_url") as string,
      location: formData.get("location") as string,
      available_for: formData.get("available_for") as string,
      bio: formData.get("bio") as string,
    };

    updateProfile.mutate(data);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f6f6f6'}}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Left Sidebar */}
          <aside className="w-60 flex-shrink-0">
            <nav className="space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#FFCC4D"></path>
                  <path d="M7.842 15.123c.025.1.649 2.433 4.158 2.433 3.51 0 4.133-2.333 4.158-2.433a.277.277 0 00-.464-.265c-.011.01-1.086 1.03-3.695 1.03-2.607 0-3.683-1.02-3.692-1.03a.28.28 0 00-.452.087.278.278 0 00-.014.178zM10.056 9.5c0 1.074-.622 1.944-1.39 1.944-.767 0-1.388-.87-1.388-1.944 0-1.074.621-1.944 1.389-1.944.767 0 1.389.87 1.389 1.944zm6.666 0c0 1.074-.621 1.944-1.389 1.944-.767 0-1.389-.87-1.389-1.944 0-1.074.622-1.944 1.39-1.944.767 0 1.388.87 1.388 1.944z" fill="#664500"></path>
                </svg>
                Profile
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path d="M14.728 9.999a9.75 9.75 0 00-1.6 1.345c-.07-2.358-.637-5.408-3.762-6.901-.618-3.364-7.83-1.655-7.183-1.329 1.285.65 1.97 2.305 2.796 3.175 1.474 1.552 3.113 1.647 3.928.433 1.927 1.252 2.054 3.627 1.995 6.166-.006.28-.013.542-.013.78v7.776c0 .614 2.223.614 2.223 0v-6.383c.3-.53 1.179-1.947 2.46-2.941.881.774 2.301.527 3.59-.83.829-.871 1.275-2.525 2.56-3.176.68-.342-7.11-2.218-6.993 1.885" fill="#77B255"></path>
                </svg>
                Account
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path d="M12 16.444a4.444 4.444 0 110-8.889 4.444 4.444 0 010 8.89zm8.889-6.11H19.02a7.16 7.16 0 00-.879-2.12l1.322-1.32a1.112 1.112 0 000-1.572l-.786-.786a1.11 1.11 0 00-1.571 0l-1.321 1.322a7.167 7.167 0 00-2.12-.88V3.112A1.111 1.111 0 0012.557 2h-1.112a1.11 1.11 0 00-1.11 1.111V4.98a7.167 7.167 0 00-2.12.879l-1.32-1.322a1.111 1.111 0 00-1.572 0l-.786.786a1.112 1.112 0 000 1.571l1.322 1.321a7.172 7.172 0 00-.88 2.12H3.112A1.111 1.111 0 002 11.443v1.112a1.11 1.11 0 001.111 1.11H4.98c.18.76.48 1.473.879 2.119l-1.322 1.322a1.112 1.112 0 000 1.571l.786.786a1.113 1.113 0 001.571 0l1.321-1.322c.655.405 1.37.702 2.12.88v1.867A1.111 1.111 0 0011.443 22h1.112a1.111 1.111 0 001.11-1.111V19.02c.76-.18 1.473-.48 2.119-.879l1.322 1.322a1.108 1.108 0 001.571 0l.786-.786a1.111 1.111 0 000-1.571l-1.322-1.321a7.16 7.16 0 00.88-2.12h1.867A1.111 1.111 0 0022 12.557v-1.112a1.111 1.111 0 00-1.111-1.11z" fill="#66757F"></path>
                </svg>
                Customization
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path d="M20.889 9.222a1.111 1.111 0 01-1.111 1.111h-3.334a1.111 1.111 0 01-1.11-1.11V8.11A1.111 1.111 0 0116.443 7h3.334a1.11 1.11 0 011.11 1.111v1.111zm-12.222 0a1.111 1.111 0 01-1.111 1.111H4.222a1.111 1.111 0 01-1.11-1.11V8.11A1.111 1.111 0 014.221 7h3.334a1.111 1.111 0 011.11 1.111v1.111z" fill="#DAC8B1"></path>
                  <path d="M22 20.889A1.111 1.111 0 0120.889 22H3.11A1.111 1.111 0 012 20.889V9.222a1.111 1.111 0 011.111-1.11H20.89A1.111 1.111 0 0122 9.221V20.89z" fill="#F1DCC1"></path>
                  <path d="M14.222 7V5.889c0-.41-.224-.765-.555-.957v-.154a1.111 1.111 0 00-1.111-1.111h-1.112a1.11 1.11 0 00-1.11 1.11v.155a1.106 1.106 0 00-.556.957V7h-.556v15h5.556V7h-.556z" fill="#DAC8B1"></path>
                  <path d="M10.889 7H9.778V5.889h1.11V7zm2.222 0h1.111V5.889h-1.11V7zm-.555 0h-1.112V5.889h1.112V7z" fill="#55ACEE"></path>
                  <path d="M11.444 18.111h-1.11v-7.778h1.11v7.778zm2.223 0h-1.111v-7.778h1.11v7.778z" fill="#3B88C3"></path>
                  <path d="M16.444 18.111h-1.11v-6.667h1.11v6.667zm2.223 0h-1.111v-6.667h1.11v6.667zm2.222 0h-1.111v-6.667h1.11v6.667zm-16.667 0h-1.11v-6.667h1.11v6.667zm2.222 0h-1.11v-6.667h1.11v6.667zm2.223 0H7.556v-6.667h1.11v6.667zm-4.445 1.667h-1.11v-1.111h1.11v1.11zm2.222 0h-1.11v-1.111h1.11v1.11zm2.223 0H7.556v-1.111h1.11v1.11z" fill="#55ACEE"></path>
                  <path d="M11.444 19.778h-1.11v-1.111h1.11v1.11zm2.223 0h-1.111v-1.111h1.11v1.11z" fill="#3B88C3"></path>
                  <path d="M16.444 19.778h-1.11v-1.111h1.11v1.11zm2.223 0h-1.111v-1.111h1.11v1.11zm2.222 0h-1.111v-1.111h1.11v1.11z" fill="#55ACEE"></path>
                  <path d="M4.222 22h-1.11v-1.667h1.11V22zm2.222 0h-1.11v-1.667h1.11V22zm2.223 0H7.556v-1.667h1.11V22zm2.777 0h-1.11v-1.667h1.11V22zm2.223 0h-1.111v-1.667h1.11V22zm2.777 0h-1.11v-1.667h1.11V22zm1.112 0h1.11v-1.667h-1.11V22zm3.333 0h-1.111v-1.667h1.11V22z" fill="#66757F"></path>
                </svg>
                Organization
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {showSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 text-sm font-medium">Profile updated successfully!</span>
                </div>
              </div>
            )}
            
            {showError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800 text-sm font-medium">Failed to update profile. Please try again!</span>
                </div>
              </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">@{profile?.username || "username"}</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-md border border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">User</h2>
                  
                  <div className="space-y-6">

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={profile?.name ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={profile?.email ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={profile?.username ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your_username"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md border border-gray-200 mt-4">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Basic</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="website_url" className="block text-sm font-medium text-gray-900 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website_url"
                        name="website_url"
                        defaultValue={profile?.website_url ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://yoursite.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={profile?.location ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Halifax, Nova Scotia"
                      />
                    </div>

                    <div>
                      <label htmlFor="available_for" className="block text-sm font-medium text-gray-900 mb-2">
                        Available for
                      </label>
                      <textarea
                        id="available_for"
                        name="available_for"
                        rows={3}
                        defaultValue={profile?.available_for ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Available for hire, mentoring, collaboration..."
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-900 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        defaultValue={profile?.bio ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="A short bio about yourself..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md border border-gray-200 mt-4">
                <div className="p-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                      isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Profile Information"}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}