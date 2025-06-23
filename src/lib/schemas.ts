import { z } from 'zod';

export const createStorySchema = z.object({
  character: z.string().min(1).max(16),
  age: z.coerce.number().min(2).max(12),
});

export type CreateStoryData = z.infer<typeof createStorySchema>;

export const generatedStorySchema = z.object({
  title: z.string().min(1).max(128),
  story: z.string()
})