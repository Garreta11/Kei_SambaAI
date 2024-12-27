import localFont from 'next/font/local';

export const monumentExtended = localFont({
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
