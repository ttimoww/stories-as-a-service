import { StoryList } from '@/components/story-library/story-list';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function HistoryPage() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
      <h1 className="text-4xl font-bold">Your Story Library 📚</h1>
      <p className="text-muted-foreground mb-4 text-sm">
        Jump back into your previous stories.
      </p>
      <StoryList />
    </main>
  );
}
