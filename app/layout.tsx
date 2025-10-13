import type { Metadata } from '@/node_modules/next/types';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tikko',
  description: 'Conference ticket generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
