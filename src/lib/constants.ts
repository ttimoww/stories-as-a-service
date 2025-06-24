import { StoryTheme } from '@prisma/client';

export const STORY_THEMES: Record<
  StoryTheme,
  {
    title: string;
    icon: string;
  }
> = {
  [StoryTheme.DINOSAURS]: {
    title: 'Dinosaurs',
    icon: '🦖',
  },
  [StoryTheme.PIRATES]: {
    title: 'Pirates',
    icon: '🏴‍☠️',
  },
  [StoryTheme.PRINCESS]: {
    title: 'Princess',
    icon: '👸',
  },
  [StoryTheme.SPACE]: {
    title: 'Space',
    icon: '🚀',
  },
  [StoryTheme.ANIMALS]: {
    title: 'Animals',
    icon: '🦁',
  },
  [StoryTheme.HORROR]: {
    title: 'Horror',
    icon: '👻',
  },
};
