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
import { Button } from '@/components/ui/button';

/**
 * The generation logic and UI is split into its own component so that its state
 * is flushed whenever the dialog closes. This ensures a clean state for each new
 * generation and allows the dialog to be reused in multiple contexts.
 */

interface GenerateDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {
  data: CreateStoryData;
}
export function GenerateDialog({ data, ...props }: GenerateDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="min-h-[500px]">
        <Generation data={data} {...props} />
      </DialogContent>
    </Dialog>
  );
}

interface GenerationProps {
  data: CreateStoryData;
}
function Generation({ data }: GenerationProps) {
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

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {story?.title ?? <Skeleton className="h-[18px] w-3/4" />}
        </DialogTitle>
        <DialogDescription>
          {story?.summary ?? <Skeleton className="h-[18px] w-1/2" />}
        </DialogDescription>
      </DialogHeader>
      {story?.content ? (
        <p
          className="text-foreground leading-7"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      ) : (
        <Loader2Icon className="mx-auto animate-spin" />
      )}
      <DialogFooter>
        <Button>Share</Button>
      </DialogFooter>
    </>
  );
}
