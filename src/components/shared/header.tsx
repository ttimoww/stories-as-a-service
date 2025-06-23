import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";
import { Logout } from "@/components/shared/logout";
interface HeaderProps extends React.ComponentProps<"header"> {}
export async function Header({ className, ...props }: HeaderProps) {
  const session = await auth();

  if (session === null) return null;

  return (
    <header {...props} className={cn("container mx-auto p-4", className)}>
      <p className="text-muted-foreground mx-auto w-fit text-sm">
        {session?.user?.name} | <Logout />
      </p>
    </header>
  );
}
