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
        <p className="text-foreground leading-6">{story.content}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
