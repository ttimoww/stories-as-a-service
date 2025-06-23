import { generatedStorySchema } from '@/lib/schemas';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import type { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const storyId = searchParams.get('storyId')

    const session = await auth()

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (!storyId) {
        return new Response('Story ID is required', { status: 400 });
    }

    const story = await db.story.findUnique({
        where: {
            id: parseInt(storyId),
        },
    });

    if (!story) {
        return new Response('Story not found', { status: 404 });
    }

    const result = streamObject({
        model: openai('gpt-4o'),
        schema: generatedStorySchema,
        prompt: `Generate a bedtime story about ${story.character} who is ${story.age} years old. It should be fully readable in 5 minutes at a slow pace.`,
    });

    return result.toTextStreamResponse();
}