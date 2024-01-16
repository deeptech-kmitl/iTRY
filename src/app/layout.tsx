// RootLayout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ITryApp from './app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iTRY',
  description: 'Hope you guys are getting better',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ITryApp>{children}</ITryApp>
      </body>
    </html>
  );
}
