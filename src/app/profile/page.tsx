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
      
      {/* Full-width background section */}
      <div className="h-40 w-full" style={{backgroundColor: '#3440c4'}}></div>
      
      <div className="max-w-5xl mx-auto -mt-0 pt-0 px-4">
      
      {/* Avatar positioned in middle of background */}
      <div className="relative -mb-0 flex justify-center">
        <Image
          src={session.user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ?? 'User')}&background=6366f1&color=fff`}
          width={128}
          height={128}
          alt={`${session.user.name} profile picture`}
          className="w-32 h-32 rounded-full border-8 shadow-lg relative z-10"
          style={{borderColor: '#3440c4'}}
        />
      </div>

      {/* Profile card overlapping background */}
      <section className="bg-white rounded-lg shadow-sm -mt-16 pt-0">
        <div className="flex justify-end px-6 pt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Edit profile
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {session.user.name}
            </h1>
            <p className="text-base text-gray-600 mb-4">
              {session.user.email}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 012.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.36a4.025 4.025 0 01-.972-2.182l-.022-.253L2 14v-1a3 3 0 012.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 00-.993.883L4 13v.971l.003.147a2 2 0 003.303 1.4c.363-.312.602-.744.674-1.218l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 003.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 003.99 0L20 14v-1a1 1 0 00-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 11-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C15.85 2.002 17 2.5 17 1z" fill="currentColor"></path>
              </svg>
              <span>
                Joined on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </section>

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