import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
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
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.story.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),
  delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.story.delete({
      where: { id: input, createdById: ctx.session.user.id },
    });
  }),
});
