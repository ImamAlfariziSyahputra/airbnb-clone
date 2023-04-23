'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../input/Input';
import Modal from './Modal';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data =>', data);
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((res) => {
      setIsLoading(false);

      if (res?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (res?.error) {
        toast.error(res.error);
      }
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
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
            onClick={loginModal.onClose}
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
      isOpen={loginModal.isOpen}
      title='Login'
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );
};
export default LoginModal;
