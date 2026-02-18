"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import SignIn from "@/app/(auth)/sign-in/_components/sign-in";
import { SignUp } from "@/app/(auth)/sign-in/_components/sign-up";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred");
        },
        onSuccess: () => {
          toast.success("Successfully signed in");
        },
      },
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div className="w-full max-w-md">
          <Tabs
            tabs={[
              {
                title: "Sign In",
                value: "sign-in",
                content: <SignIn />,
              },
              {
                title: "Sign Up",
                value: "sign-up",
                content: <SignUp />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
