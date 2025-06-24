import '@/styles/globals.css';

import { type Metadata } from 'next';
import { Geist } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components/global/header';
import { ThemeProvider } from '@/providers/theme-provider';
import { Footer } from '@/components/global/footer';

export const metadata: Metadata = {
  title: 'Stories as a Service',
  description: 'Generate your own personalized bedtime story in seconds',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(geist.variable, 'h-full')}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <TRPCReactProvider>
              <NuqsAdapter>
                <Header />
                <div className="flex flex-1 flex-col">{children}</div>
                <Footer />
              </NuqsAdapter>
            </TRPCReactProvider>
          </SessionProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
