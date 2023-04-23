import { Nunito } from 'next/font/google';

import './globals.css';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Providers from './components/providers/Providers';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Providers>
          <RegisterModal />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
