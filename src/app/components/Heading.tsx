'use client';

import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={cn(center ? 'text-center' : 'text-start')}>
      <div className='text-2xl font-bold'>{title}</div>

      <div className='mt-2 font-light text-neutral-500'>{subtitle}</div>
    </div>
  );
};
export default Heading;
