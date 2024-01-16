import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';

export default function useSignInController() {

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
  };

  const handleFacebookLogin = () => {
    signIn('facebook')
  };

  const handleGoogleLogin = () => {
    signIn("google")
  };

  return {
    errors,
    handleSubmit,
    handleFacebookLogin,
    handleGoogleLogin,
    onSubmit,
    register
  }

}