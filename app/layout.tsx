import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dream Weaver Tales',
  description: 'AI-powered bedtime stories, personalized for your child.',
  openGraph: {
    title: 'Dream Weaver Tales',
    description: 'AI-powered bedtime stories, personalized for your child.',
    images: ['/og-image.png'],
  },
  other: {
    // Farcaster Frame metadata
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/og-image.png`,
    'fc:frame:button:1': 'Generate Story',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:2': 'Customize',
    'fc:frame:button:2:action': 'post',
    'fc:frame:button:3': 'My Stories',
    'fc:frame:button:3:action': 'post',
    'fc:frame:input:text': 'Enter your child\'s name',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/frame`,

    // Base Mini App metadata
    'base:app:frame': 'vNext',
    'base:app:frame:image': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/og-image.png`,
    'base:app:frame:button:1': 'Open Dream Weaver Tales',
    'base:app:frame:button:1:action': 'link',
    'base:app:frame:button:1:target': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <Providers>
              {children}
            </Providers>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
