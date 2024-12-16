import localFont from 'next/font/local';
import './globals.scss';
import Header from './components/header/Header';
import Anchors from './components/anchors/Anchors';
import Background from './components/background/Background';

// Adding MoneumentExtended with different weights and styles
const monumentExtended = localFont({
  src: [
    {
      path: './fonts/MonumentExtended-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MonumentExtended-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/MonumentExtended-Ultrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/MonumentExtended-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-monument-extended',
});

export const metadata = {
  title: 'Samba AI',
  description: 'Samba AI is the heartbeat of Global Video',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${monumentExtended.variable}`}>
        <Header />
        <Background />
        {children}
        <Anchors />
      </body>
    </html>
  );
}
