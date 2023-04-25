'use client';

import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={() => onClick(label)}
      className={cn(
        'flex w-full cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black',
        selected ? 'border-black' : 'border-neutral-200'
      )}
    >
      <Icon size={30} />

      <div className='font-semibold'>{label}</div>
    </button>
  );
};
export default CategoryInput;
