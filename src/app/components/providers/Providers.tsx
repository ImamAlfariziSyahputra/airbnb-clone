'use client';

import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
export default Providers;
