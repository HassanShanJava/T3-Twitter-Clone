import { router } from "../trpc";
import { authRouter } from "./auth";
// import { exampleRouter } from "./example";
import { tweetrouter } from "./tweet";

export const appRouter = router({
  // example: exampleRouter,
  tweet:tweetrouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
