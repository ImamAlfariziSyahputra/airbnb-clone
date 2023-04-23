import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/logo.png'
        alt='Logo'
        height={100}
        width={100}
        className='hidden cursor-pointer md:block'
      />
    </Link>
  );
};
export default Logo;
