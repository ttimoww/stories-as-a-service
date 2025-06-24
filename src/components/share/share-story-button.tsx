import { Button } from '@/components/ui/button';
import { api } from '@/trpc/react';
import { toast } from 'sonner';

interface ShareButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  storyId?: number;
}
export function ShareButton({ storyId, ...props }: ShareButtonProps) {
  if (!storyId) {
    return <Button {...props} disabled />;
  }

  const { mutate, isPending } = api.story.share.useMutation();

  function handleShare(storyId: number) {
    mutate(storyId, {
      onSuccess: (token) => {
        const url = `${window.location.origin}?share=${token}`;
        void navigator.clipboard.writeText(url);
        toast.success('A share link has been copied to your clipboard');
      },
      onError: () => {
        toast.error('Something went wrong, please try again.');
      },
    });
  }
  return (
    <Button
      {...props}
      onClick={() => handleShare(storyId)}
      disabled={isPending}
    />
  );
}
