import { z } from 'zod';

export const createStorySchema = z.object({
  character: z.string().min(1).max(16),
  age: z.coerce.number().min(2).max(12),
});
export type CreateStoryData = z.infer<typeof createStorySchema>;

export const generatedStorySchema = z.object({
  content: z.string(),
  title: z.string().min(1).max(128),
  summary: z
    .string()
    .min(1)
    .max(256)
    .describe(
      'A short summary of the story no longer than 256 characters',
    ),
});
export type GeneratedStory = z.infer<typeof generatedStorySchema>;