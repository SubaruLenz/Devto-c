import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/");
  }

  const userPosts = await api.post.getUserPosts();
  const userProfile = await api.user.getProfile();

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f6f6f6'}}>
      {/* Background section */}
      <div className="h-36 w-full bg-blue-600"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Profile card overlapping background */}
        <div className="bg-white rounded-md border border-gray-200 -mt-16 relative z-10">
          {/* Profile image overlapping card */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <Image
              src={session.user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ?? 'User')}&background=6366f1&color=fff`}
              width={128}
              height={128}
              alt={`${session.user.name} profile picture`}
              className="w-32 h-32 rounded-full border-8 border-blue-600"
            />
          </div>
          
          {/* Edit button positioned on right */}
          <div className="absolute top-6 right-6">
            <Link href="/settings" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Edit Profile
            </Link>
          </div>
          
          {/* Card content */}
          <div className="pt-20 pb-8 px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {session.user.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {userProfile?.bio || "404 bio not found"}
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-gray-500">
                    <path fill="currentColor" d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439h-.001z"></path>
                  </svg>
                  <span>{session.user.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-gray-500">
                    <path fill="currentColor" d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 012.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.36a4.025 4.025 0 01-.972-2.182l-.022-.253L2 14v-1a3 3 0 012.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 00-.993.883L4 13v.971l.003.147a2 2 0 003.303 1.4c.363-.312.602-.744.674-1.218l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 003.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 003.99 0L20 14v-1a1 1 0 00-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 11-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C15.85 2.002 17 2.5 17 1z"></path>
                  </svg>
                  <span>
                    Joined {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dev.to Clone Layout */}
        <div className="mt-4 flex gap-4">
          {/* Left Sidebar - Stats */}
          <aside className="w-80 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-md border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Skills/Languages</h3>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700">React, TypeScript, Next.js, Tailwind CSS</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Currently learning</h3>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700">tRPC, Prisma</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Currently hacking on</h3>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700">Dev.to Clone with T3 Stack</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Available for</h3>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700">Full-stack development, mentoring</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md border border-gray-200 p-3">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-500 mr-3">
                  <path fill="currentColor" d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                </svg>
                <span className="text-sm text-gray-700">{userPosts.length} posts published</span>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-500 mr-3">
                  <path fill="currentColor" d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                </svg>
                <span className="text-sm text-gray-700">0 comments written</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-500 mr-3">
                  <path fill="currentColor" d="M7.784 14l.42-4H4V8h4.415l.525-5h2.011l-.525 5h3.989l.525-5h2.011l-.525 5H20v2h-3.784l-.42 4H20v2h-4.415l-.525 5h-2.011l.525-5H9.585l-.525 5H7.049l.525-5H4v-2h3.784zm2.011 0h3.99l.42-4h-3.99l-.42 4z"></path>
                </svg>
                <span className="text-sm text-gray-700">0 tags followed</span>
              </div>
            </div>
          </aside>

          {/* Right Main Area - Posts */}
          <main className="flex-1 space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-md border border-gray-200 p-6">
                  <div className="flex gap-3">
                    <Image 
                      src={session.user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ?? 'User')}&background=6366f1&color=fff`}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500 mb-3">{post.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <h3 className="text-xl font-bold text-gray-900">{post.name}</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-md border border-gray-200 p-6">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">No posts yet. Start writing!</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Write your first post
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}