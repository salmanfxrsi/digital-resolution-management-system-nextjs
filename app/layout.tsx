"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import Navbar from "@/components/shared/Navbar/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import BottomBar from "@/components/shared/BottomBar";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login";

  useEffect(() => {
    if (status === "unauthenticated" && !isAuthPage) {
      router.push("/login");
    }
  }, [status, isAuthPage, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </main>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!session) {
    return null; // while redirecting
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <Provider store={store}>
            <AuthGuard>
              {isAuthPage ? (
                <main className="flex min-h-screen items-center justify-center p-6">
                  {children}
                </main>
              ) : (
                <div className="flex h-screen overflow-hidden relative">
                  {/* Sidebar only visible on md+ */}
                  <div className="hidden md:flex">
                    <Sidebar
                      isOpen={isSidebarOpen}
                      setIsOpen={setIsSidebarOpen}
                    />
                  </div>

                  <div className="flex flex-col flex-1 overflow-hidden">
                    <Navbar
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <main className="flex-1 overflow-y-auto p-6">
                      <Toaster position="top-right" />
                      {children}
                    </main>
                  </div>

                  {/* Mobile Bottom Bar */}
                  <div className="md:hidden">
                    <BottomBar />
                  </div>
                </div>
              )}
            </AuthGuard>
          </Provider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
