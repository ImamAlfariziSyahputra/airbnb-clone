'use client';

import { useMemo, useState } from 'react';
import useRentModal from '@/app/hooks/useRentModal';
import { FieldValues, useForm } from 'react-hook-form';

import Heading from '../Heading';
import CategoryInput from '../input/CategoryInput';
import { categories } from '../navbar/Categories';
import Modal from './Modal';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const categoryWatch = watch('category');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which if these best describes your place?'
        subtitle='Pick a category'
      />

      <div className='grid grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2'>
        {categories.map((ctg) => (
          <div key={ctg.label} className='col-span-1'>
            <CategoryInput
              onClick={(categoryLabel) =>
                setCustomValue('category', categoryLabel)
              }
              selected={categoryWatch === ctg.label}
              label={ctg.label}
              icon={ctg.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title='Airbnb your home!'
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
    />
  );
};
export default RentModal;
