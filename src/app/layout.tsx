// RootLayout.tsx
import { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import ITryApp from './app';

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
    <html lang="en" data-theme="dark">
      <body className="font-prompt">
        <ITryApp>
          {children}
        </ITryApp>
      </body>
    </html>
  );
}
