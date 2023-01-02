// import { z } from "zod";
import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, router } from "../trpc";

export const tweetrouter = router({
    create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
      // here is a callback
      const { prisma, session } = ctx;
      const { text } = input;

      const userId = session.user.id;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
