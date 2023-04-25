'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { cn } from '@/lib/utils';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);

    // return () => clearTimeout(timer);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-[50] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none'>
      <div className='relative mx-auto h-[calc(100vh-4rem)] w-full overflow-hidden md:w-4/5 lg:w-3/6 xl:w-2/5'>
        {/* CONTENT */}
        <div
          className={cn(
            'translate h-full duration-300',
            showModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          )}
        >
          <div className='translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto'>
            {/* HEADER */}
            <div className='relative flex items-center justify-center rounded-t border-b p-6'>
              <button
                type='button'
                onClick={handleClose}
                className='absolute left-9 border-0 p-1 transition hover:opacity-70'
              >
                <IoMdClose size={18} />
              </button>

              <div className='text-lg font-semibold'>{title}</div>
            </div>

            <div className='max-h-[calc(100vh-77px-4rem)] overflow-y-auto'>
              {/* BODY */}
              <div className='relative flex-auto p-6'>{body}</div>
              {/* FOOTER */}
              <div className='flex flex-col gap-2 p-6'>
                <div className='flex w-full flex-row items-center gap-4'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                      outline
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
