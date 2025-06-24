import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { createStorySchema } from '@/lib/schemas';
import { shareToken } from '@/lib/tokens';

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
      return story.id;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.story.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.story.delete({
        where: { id: input, createdById: ctx.session.user.id },
      });
    }),
  share: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const story = await ctx.db.story.findUnique({
        where: { id: input, createdById: ctx.session.user.id },
      });

      if (!story) {
        throw new Error('Story not found');
      }

      return shareToken.create({ storyId: story.id });
    }),
  getByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const payload = shareToken.read(input.token);

      if (!payload) {
        return null
      }

      return ctx.db.story.findUnique({ where: { id: payload.storyId }, include: { createdBy: true } });
    }),
});
