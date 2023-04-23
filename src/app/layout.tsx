import { Nunito } from 'next/font/google';

import './globals.css';
import getCurrentUser from './actions/getCurrentUser';
import LoginModal from './components/modals/LoginModal';
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <Providers>
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
