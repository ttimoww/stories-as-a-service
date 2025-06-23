import { CreateStory } from '@/components/create-story';
import { auth } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';
import Link from 'next/link';

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <h1 className="text-4xl font-bold">(Bedtime) Story as a Service ✨</h1>
        <p className="text-muted-foreground text-sm">
          Create your own personalized bedtime story in seconds.
        </p>
        <CreateStory session={session} className="w-full max-w-xl" />
        <p className="text-muted-foreground text-sm">
          See how it works on{' '}
          <Link href="https://github.com/ttimoww" className="underline">
            Github
          </Link>
        </p>
      </main>
    </HydrateClient>
  );
}
