'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='px-4 py-3 text-start font-semibold transition hover:bg-neutral-100'
    >
      {label}
    </button>
  );
};
export default MenuItem;
