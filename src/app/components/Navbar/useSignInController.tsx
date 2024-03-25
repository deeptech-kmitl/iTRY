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
    try {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl, redirect: callbackUrl ? true : false
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = () => {
    try {
      signIn('facebook', { callbackUrl: callbackUrl, redirect: false })
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    try {
      signIn("google", { callbackUrl: callbackUrl, redirect: false })
    } catch (error) {
      console.log(error);
    }
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