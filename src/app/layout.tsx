import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Om Ghante - Personal Engineering Portfolio',
  description: 'Full Stack Engineer building scalable backend systems, enterprise software, AI platforms, and developer infrastructure.',
  keywords: ['Om Ghante', 'Software Engineer', 'Full Stack Developer', 'Next.js Portfolio', 'Distributed Systems', 'AI Applications'],
  authors: [{ name: 'Om Ghante', url: 'https://github.com/omghante' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
