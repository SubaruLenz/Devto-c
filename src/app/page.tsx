import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

import { LatestPost } from "~/app/_components/post";
import { auth, signIn } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
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
              <div className="hidden md:flex relative w-150">
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
              

              
              {session ? (
                <>
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
                  
                  <Link href="/profile" className="p-1 hover:bg-gray-100 rounded-full">
                    <Image 
                      src={session.user.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ?? 'User')}&background=6366f1&color=fff`}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <form action={async () => {
                    "use server";
                    await signIn();
                  }} className="inline">
                    <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm bg-transparent border-none px-3 py-2 rounded-md">
                      Log in
                    </button>
                  </form>
                  <a className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white hover:underline text-sm font-medium ml-6" href="#">
                    Create account
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              {session ? (
                <form action={async () => {
                  "use server";
                  redirect("/auth/signout");
                }}>
                  <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                    Sign out
                  </button>
                </form>
              ) : (
                <form action={async () => {
                  "use server";
                  await signIn();
                }}>
                  <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                    Sign in
                  </button>
                </form>
              )}
            </div>
          </div>

          {session?.user && (
            <div className="flex flex-col items-center gap-4">
              <LatestPost />
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
