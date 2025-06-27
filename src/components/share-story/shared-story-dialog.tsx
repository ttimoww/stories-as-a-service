import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/server';
interface SharedStoryDialogProps {
  token: string;
}
export async function SharedStoryDialog({ token }: SharedStoryDialogProps) {
  const story = await api.story.getByToken({ token });

  if (!story) {
    return null;
  }
  return (
    <Dialog defaultOpen={!!token}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>
            Shared by {story.createdBy.name}
          </DialogDescription>
        </DialogHeader>
        <div className="h-[75vh] max-h-[600px] overflow-y-auto">
          <p className="text-foreground leading-6 whitespace-pre-line">
            {story.content}
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
