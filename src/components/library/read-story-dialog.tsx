import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Story } from '@prisma/client';

interface ReadStoryDialogProps extends React.ComponentProps<typeof Button> {
  story: Story;
}

export function ReadStoryDialog({ story, ...props }: ReadStoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Read Story</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>{story.summary}</DialogDescription>
        </DialogHeader>
        <p
          className="text-foreground leading-7"
          dangerouslySetInnerHTML={{ __html: story.content ?? '' }}
        />
      </DialogContent>
    </Dialog>
  );
}
