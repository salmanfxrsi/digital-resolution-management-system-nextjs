"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/Navbar/logo";

export default function Loginpage() {
  return (
    <div className="flex items-center justify-center max-w-xl">
      <Card className="w-full  shadow-lg border border-muted">
        <CardHeader className="text-center">
          <Link
            href="/overview"
            className="flex justify-center items-center shrink-0"
          >
            <Logo />
          </Link>

          <p className="text-sm text-muted-foreground">
            Sign in to continue to Digital Resolution
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full mt-4 bg-red-500 uppercase">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}
