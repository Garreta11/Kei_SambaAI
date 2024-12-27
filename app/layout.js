import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.scss';
import Header from './components/header/Header';
import Anchors from './components/anchors/Anchors';
import Background from './components/background/Background';
import KeepScrolling from './components/keepScrolling/KeepScrolling';
import Loader from './components/loader/Loader';
import { monumentExtended } from './fonts';

export const metadata = {
  title: 'Samba AI',
  description: 'Samba AI is the heartbeat of Global Video',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={monumentExtended.variable}>
        <Header />
        <Background />
        {children}
        <KeepScrolling />
        <Anchors />
      </body>
    </html>
  );
}
