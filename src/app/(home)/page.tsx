import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, trpc } from "@/trpc/server";
import { ClientHome } from "./client-home";
export default async function Home() {
  void trpc.hello.prefetch({ text: "from tRP C" });

  return (
    <HydrateClient>
      <Suspense fallback={<p>loading</p>}>
        <ErrorBoundary fallback={<p>error</p>}>
          <ClientHome />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
