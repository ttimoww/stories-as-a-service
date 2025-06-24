import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Story } from '@prisma/client';
import { ShareButton } from '@/components/share/share-story-button';
interface ReadStoryDialogProps extends React.ComponentProps<typeof Button> {
  story: Story;
}

export function ReadStoryDialog({ story, ...props }: ReadStoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Read Story</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>{story.summary}</DialogDescription>
        </DialogHeader>
        <div className="h-[75vh] max-h-[600px] overflow-y-auto">
          <p
            className="text-foreground leading-7"
            dangerouslySetInnerHTML={{ __html: story.content ?? '' }}
          />
        </div>
        <DialogFooter>
          <ShareButton storyId={story.id}>Share Story</ShareButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
