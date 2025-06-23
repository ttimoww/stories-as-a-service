import { z } from 'zod';

export const createStorySchema = z.object({
  character: z.string().min(1).optional(),
  age: z.coerce.number().min(2).max(12),
});

export type CreateStoryData = z.infer<typeof createStorySchema>;
