import { generatedStorySchema, type CreateStoryData } from '@/lib/schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { experimental_useObject } from '@ai-sdk/react';
import { api } from '@/trpc/react';
import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';

interface GenerateDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {
  data: CreateStoryData;
}
export function GenerateDialog({ data, ...props }: GenerateDialogProps) {
  const { mutate, isPending, data: storyId } = api.story.create.useMutation();

  useEffect(() => {
    mutate(data);
  }, [data, mutate]);

  return (
    <Dialog {...props}>
      <DialogContent className="min-h-[500px]">
        <DialogHeader>
          <DialogTitle>There&apos;s a story in the making...</DialogTitle>
          <DialogDescription>
            This is a story about {data.character} who is {data.age} years old.
          </DialogDescription>
        </DialogHeader>
        {isPending && <Loader2Icon className="mx-auto animate-spin" />}
        {storyId && <StoryStream storyId={storyId} />}
      </DialogContent>
    </Dialog>
  );
}

interface StoryStreamProps {
  storyId: number;
}
function StoryStream({ storyId }: StoryStreamProps) {
  const { object, submit, isLoading, stop } = experimental_useObject({
    api: '/api/generate?storyId=' + storyId,
    schema: generatedStorySchema,
  });

  console.log(object);

  return (
    <div>
      <button
        onClick={() => submit('Messages during finals week.')}
        disabled={isLoading}
      >
        Generate notifications
      </button>

      {isLoading && (
        <div>
          <div>Loading...</div>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <p className="text-lg font-bold">{object?.title}</p>
      <p className="text-sm">{object?.story}</p>
    </div>
  );
}
