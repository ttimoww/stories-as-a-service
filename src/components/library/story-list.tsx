'use client';
import type { GeneratedStory } from '@/lib/schemas';
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Card, CardContent } from '@/components/ui/card';
import type { Story } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { ReadStoryDialog } from '@/components/library/read-story-dialog';
interface StoryListProps extends React.HTMLAttributes<HTMLDivElement> {}
export function StoryList({ className, ...props }: StoryListProps) {
  const [stories] = api.story.getAll.useSuspenseQuery();

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">No stories found</p>
        <Button asChild>
          <Link href="/">Create a story</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2',
        className,
      )}
      {...props}
    >
      {stories?.map((story) => <StoryCard key={story.id} story={story} />)}
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const utils = api.useUtils();

  const { mutate: deleteStory, isPending } = api.story.delete.useMutation({
    onSuccess: () => {
      void utils.story.getAll.invalidate();
    },
  });

  return (
    <Card className="relative overflow-hidden">
      <LoadingOverlay show={isPending} />
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>
          {story.createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{story.summary}</p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <Button variant="outline" onClick={() => deleteStory(story.id)}>
          Delete
        </Button>
        <ReadStoryDialog story={story} />
      </CardFooter>
    </Card>
  );
}
