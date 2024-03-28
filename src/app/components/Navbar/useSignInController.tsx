import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';



export default function useSignInController(
  {
    callbackUrl,
    signInSuccess
  }: {
    callbackUrl: string | undefined;
    signInSuccess: () => void;
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
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if(response?.error) {
          Swal.fire({
            icon: "error",
            text: response.error,
            showConfirmButton: false,
            timer: 1500
          });
      } else{
        signInSuccess()
      }

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