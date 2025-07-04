'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useQueryStates,
  parseAsString,
  parseAsFloat,
  parseAsBoolean,
  parseAsStringEnum,
} from 'nuqs';
import { LoginDialog } from '@/components/login-dialog';
import type { Session } from 'next-auth';
import { createStorySchema } from '@/lib/schemas';
import { StoryTheme } from '@prisma/client';
import { GenerationDialog } from '@/components/create-story/generation';
import { ThemeSelection } from '@/components/create-story/theme-selection';
interface CreateStoryProps extends React.ComponentProps<typeof Card> {
  session: Session | null;
}

export function CreateStory({ session, ...props }: CreateStoryProps) {
  const [data, setData] = useQueryStates({
    character: parseAsString.withDefault(''),
    age: parseAsFloat.withDefault(8),
    theme: parseAsStringEnum<StoryTheme>(Object.values(StoryTheme)).withDefault(
      StoryTheme.DINOSAURS,
    ),
    redirect: parseAsBoolean.withDefault(false),
  });

  const form = useForm<z.infer<typeof createStorySchema>>({
    resolver: zodResolver(createStorySchema),
    defaultValues: data ?? undefined,
  });

  function onSubmit(values: z.infer<typeof createStorySchema>) {
    void setData({ ...values, redirect: true });
  }

  function handleCloseDialog() {
    void setData({ ...data, redirect: false });
  }

  return (
    <>
      {session === null && (
        <LoginDialog open={data.redirect} onOpenChange={handleCloseDialog} />
      )}
      {session !== null && (
        <GenerationDialog
          open={data.redirect}
          onOpenChange={handleCloseDialog}
          data={data}
        />
      )}
      <Card {...props}>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="character"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Character</FormLabel>
                    <FormControl>
                      <Input placeholder="Joe" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Use your child&apos;s name for a personalised story
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="7"
                        type="number"
                        min={0}
                        max={12}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We use this to determine the story&apos;s difficulty
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story Theme</FormLabel>
                    <FormControl>
                      <ThemeSelection field={field} />
                    </FormControl>
                    <FormDescription>
                      Choose what the story should be about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Story</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
