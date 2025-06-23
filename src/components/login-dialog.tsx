import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathnameWithParams } from '@/hooks/use-pathname-with-params';
import { Chrome, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface LoginDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'children'> {}
export function LoginDialog({ ...props }: LoginDialogProps) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathnameWithParams();

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn('google', { callbackUrl: pathname });
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign in', {
        description: 'There was a problem signing in with. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Since LLM&apos;s are not free and I don&apos;t want to go bankrupt,
            please login to continue
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 md:grid-cols-2">
          <Button variant="outline" onClick={handleLogin} disabled={loading}>
            <Chrome className="size-4" /> Sign in with Google
          </Button>
          <Button variant="outline" onClick={handleLogin} disabled={loading}>
            <Github className="size-4" /> Sign in with Github
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          I&apos;ll <span className="font-bold">never</span> contact you, just
          making sure this app is not abused
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
