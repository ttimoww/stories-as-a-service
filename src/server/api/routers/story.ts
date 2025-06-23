import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createStorySchema } from '@/lib/schemas';

export const storyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createStorySchema)
    .mutation(async ({ ctx, input }) => {
      const story = await ctx.db.story.create({
        data: {
          age: input.age,
          character: input.character,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
      return story.id
    }),
});
