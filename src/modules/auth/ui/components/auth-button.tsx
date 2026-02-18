"use client";

import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { UserButton } from "./user-button";

export const AuthButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button
        asChild
        variant="outline"
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
      >
        <Link href="/sign-in">
          <UserCircleIcon />
          Sign In
        </Link>
      </Button>
    );
  }

  return <UserButton session={session} />;
};
