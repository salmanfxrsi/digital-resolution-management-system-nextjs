/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/shared/Navbar/logo";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      console.error("Login failed");
    }
  };

  useEffect(() => {
    if ((session as any)?.user?.user?.userType) {
      const userType = (session as any)?.user?.user?.userType;
      router.push(
        userType === "admin" ? "/admin/overview" : "/employee/overview"
      );
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center max-w-xl">
      <Card className="w-full shadow-lg border border-muted">
        <CardHeader className="text-center">
          <Link
            href="/login"
            className="flex justify-center items-center shrink-0"
          >
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to Digital Resolution
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              disabled={!email || !password}
              type="submit"
              className="w-full cursor-pointer mt-4 bg-red-500 uppercase hover:bg-red-600 transition"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
