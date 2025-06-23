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
      console.log(input);
    }),
});
