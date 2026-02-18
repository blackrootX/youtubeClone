import { initTRPC } from "@trpc/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { ratelimit } from "@/lib/ratelimit";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  return {
    session,
    userId: session?.user.id ?? null,
  };
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new Error("Unauthorized");
  }

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, ctx.userId!))
    .limit(1);

  if (!existingUser) {
    throw new Error("Unauthorized");
  }

  const { success } = await ratelimit.limit(ctx.userId!);
  if (!success) {
    throw new Error("Too many requests");
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
