import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function useAddActivity() {
  const schema = yup.object().shape({
    activityName: yup.string().required('Email is required'),
    registerDateStart: yup.string().required('Password is required'),
    registerDateEnd: yup.string().required('Password is required'),
    viewBy: yup.string().required('Password is required'),
    // timeline: yup.string().required('Password is required'),
    // facebookLink: yup.string().required('Password is required'),
    // igLink: yup.string().required('Password is required'),
    // registerLink: yup.string().required('Password is required'),
    // faq: yup.string().required('Password is required'),
    // telephone: yup.string().required('Password is required'),
    // email: yup.string().required('Password is required'),
  });

  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:any) => {
    console.log(data)
  }


  return {
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    onSubmit
  }

}