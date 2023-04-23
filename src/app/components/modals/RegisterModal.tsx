'use client';

import { useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../input/Input';
import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data =>', data);
    setIsLoading(true);

    try {
      await axios.post('/api/register', data);
      registerModal.onClose();
    } catch (err: any) {
      console.log('err =>', err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        type='password'
        id='password'
        label='Password'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button
        label='Continue with Google'
        icon={FcGoogle}
        outline
        onClick={() => {}}
      />
      <Button
        label='Continue with Github'
        icon={AiFillGithub}
        outline
        onClick={() => {}}
      />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <span className=''>Already have an account?</span>
          <button
            type='button'
            onClick={registerModal.onClose}
            className='cursor-pointer text-neutral-800 hover:underline'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title='Register'
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );
};
export default RegisterModal;
