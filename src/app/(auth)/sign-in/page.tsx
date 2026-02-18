"use client";

import { siGithub } from "simple-icons";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Continue with your GitHub account
        </p>
      </div>
      <Button
        className="w-full"
        variant="outline"
        onClick={() =>
          authClient.signIn.social({ provider: "github", callbackURL: "/" })
        }
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="mr-2 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siGithub.path} />
        </svg>
        Continue with GitHub
      </Button>
    </div>
  );
}
