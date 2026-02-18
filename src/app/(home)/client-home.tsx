"use client";

import { trpc } from "@/trpc/client";

export function ClientHome() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "from tRP C" });

  return (
    <div>
      <p>{data?.greeting}</p>
    </div>
  );
}
