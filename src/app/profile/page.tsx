import { redirect } from "next/navigation";
import Image from "next/image";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/");
  }

  const userPosts = await api.post.getUserPosts();

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-blue-600">DEV</h1>
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-3 py-2 border rounded-md w-64 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
                Write
              </button>
              <Image 
                src={session.user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ?? 'User')}&background=6366f1&color=fff`}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Background section */}
      <div className="h-36 w-full bg-blue-600"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Profile card overlapping background */}
        <div className="bg-white rounded-xl -mt-16 relative z-10">
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Edit Profile
            </button>
          </div>
          
          {/* Card content */}
          <div className="pt-20 pb-8 px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {session.user.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {session.user.email}
              </p>
              
              <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>
                  Joined {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

      {userPosts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900">{post.name}</h3>
                <p className="text-sm text-gray-500">
                  {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}