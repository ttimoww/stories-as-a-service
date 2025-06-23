import type { CreateStoryData } from '@/lib/schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { api } from '@/trpc/react';
import { useEffect } from 'react';

interface GenerateDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {
  data: CreateStoryData;
}
export function GenerateDialog({ data, ...props }: GenerateDialogProps) {
  const { mutate: createStory, isPending } = api.story.create.useMutation();

  useEffect(() => {
    createStory(data);
  }, []);

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Story</DialogTitle>
          <DialogDescription>
            LLM&apos;s are not free, so please login to continue
          </DialogDescription>
        </DialogHeader>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
        {isPending}
      </DialogContent>
    </Dialog>
  );
}
