import { Check } from 'lucide-react';
import { useRef } from 'react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { STORY_THEMES } from '@/lib/constants';

interface ThemeSelectionProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export function ThemeSelection<T extends FieldValues>({
  field,
}: ThemeSelectionProps<T>) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const setButtonRef =
    (index: number) => (element: HTMLButtonElement | null) => {
      buttonsRef.current[index] = element;
    };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const buttons = buttonsRef.current.filter(Boolean);
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % buttons.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + buttons.length) % buttons.length;
        break;
      case 'ArrowDown':
        nextIndex = (index + 3) % buttons.length;
        break;
      case 'ArrowUp':
        nextIndex = (index - 3 + buttons.length) % buttons.length;
        break;
      default:
        return;
    }

    e.preventDefault();
    buttons[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select a story theme"
      className="grid grid-cols-2 gap-4 md:grid-cols-3"
    >
      {Object.entries(STORY_THEMES).map(([theme, { title, icon }], index) => (
        <button
          ref={setButtonRef(index)}
          key={theme}
          type="button"
          role="radio"
          aria-checked={field.value === theme}
          aria-labelledby={`theme-${theme}-label`}
          tabIndex={
            field.value === theme || (!field.value && index === 0) ? 0 : -1
          }
          className={cn(
            'relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all',
            'hover:border-primary/50 hover:bg-accent focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            {
              'border-primary bg-accent': field.value === theme,
              'border-muted': field.value !== theme,
            },
          )}
          onClick={() => field.onChange(theme)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {field.value === theme && (
            <span
              className="text-primary absolute top-2 right-2"
              aria-hidden="true"
            >
              <Check className="h-4 w-4" />
            </span>
          )}
          <span className="mb-2 text-4xl" aria-hidden="true">
            {icon}
          </span>
          <span className="font-medium" id={`theme-${theme}-label`}>
            {title}
          </span>
        </button>
      ))}
    </div>
  );
}
