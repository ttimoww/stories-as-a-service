import { auth } from '@/server/auth';
import { cn } from '@/lib/utils';
import { Logout } from '@/components/shared/logout';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/shared/theme-toggle';

const links = [
  {
    label: 'Home',
    href: '/',
    show: 'always',
  },
  {
    label: 'Library',
    href: '/library',
    show: 'logged-in',
  },
];

interface HeaderProps extends React.ComponentProps<'header'> {}
export async function Header({ className, ...props }: HeaderProps) {
  const session = await auth();

  return (
    <header
      {...props}
      className={cn(
        'container mx-auto flex items-center justify-between p-4',
        className,
      )}
    >
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => {
            if (link.show === 'logged-out' && session !== null) return null;
            if (link.show === 'logged-in' && session === null) return null;

            return (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        {session && <Logout variant="outline" />}
        <ThemeToggle variant="outline" />
      </div>
    </header>
  );
}
