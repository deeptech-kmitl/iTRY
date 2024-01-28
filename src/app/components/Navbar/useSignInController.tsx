import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';



export default function useSignInController(
  {
    callbackUrl
  }: {
    callbackUrl: string | undefined
  }
) {

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
      callbackUrl: callbackUrl
    })
  };

  const handleFacebookLogin = () => {
    signIn('facebook', { callbackUrl: callbackUrl })
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: callbackUrl })
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