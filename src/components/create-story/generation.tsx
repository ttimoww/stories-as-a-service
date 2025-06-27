import { generatedStorySchema, type CreateStoryData } from '@/lib/schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { experimental_useObject } from '@ai-sdk/react';
import { api } from '@/trpc/react';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShareButton } from '@/components/share-story/share-story-button';
import { useSession } from 'next-auth/react';

/**
 * The generation logic and UI is split into its own component so that its state
 * is flushed whenever the dialog closes. This ensures a clean state for each new
 * generation and allows the dialog to be reused in multiple contexts.
 */

interface GenerationDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {
  data: CreateStoryData;
}
export function GenerationDialog({ data, ...props }: GenerationDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <Generation data={data} {...props} />
      </DialogContent>
    </Dialog>
  );
}

interface GenerationProps {
  data: CreateStoryData;
}
function Generation({ data }: GenerationProps) {
  const { data: session } = useSession();
  const [storyId, setStoryId] = useState<number | null>(null);

  const createStory = api.story.create.useMutation({
    onSuccess: (id) => setStoryId(id),
  });

  const { object: story, submit } = experimental_useObject({
    api: storyId ? `/api/generate?storyId=${storyId}` : '',
    schema: generatedStorySchema,
  });

  useEffect(() => {
    // Step 1: create story
    createStory.mutate(data);
  }, []);

  useEffect(() => {
    // Step 2: start AI generation once we have a story ID
    if (storyId) {
      submit('');
    }
  }, [storyId]);

  const user = session?.user.name;

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {story?.title ?? <Skeleton className="h-[18px] w-3/4" />}
        </DialogTitle>
        <DialogDescription>
          {user ? (
            `Created by ${user}`
          ) : (
            <Skeleton className="h-[18px] w-1/2" />
          )}
        </DialogDescription>
      </DialogHeader>
      <div className="relative h-[75vh] max-h-[600px] overflow-y-auto">
        {story?.content ? (
          <p className="text-foreground leading-7 whitespace-pre-line">
            {story?.content}
          </p>
        ) : (
          <Loader2Icon className="absolute top-1/2 left-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 animate-spin" />
        )}
      </div>
      <DialogFooter>
        {storyId && <ShareButton storyId={storyId}>Share Story</ShareButton>}
      </DialogFooter>
    </>
  );
}
