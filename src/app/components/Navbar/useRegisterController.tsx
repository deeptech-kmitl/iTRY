import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { regiserNewUser, RegisterUser } from '@/app/api/users/route';
import Swal from 'sweetalert2';


export default function useRegisterController({
  registerSuccess
}: {
  registerSuccess: () => void;
}) {

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, "Password must be at least 8 characters"),
    confirmPassword: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Your passwords do not match.')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const newRegisterUser: RegisterUser = {
        username: data.username,
        email: data.email,
        password: data.password
      }

      await regiserNewUser(newRegisterUser)

      registerSuccess()

      Swal.fire({
          icon: "success",
          text: "สมัครผู้ใช้งานสำเร็จ",
          showConfirmButton: false,
          timer: 1500
      });
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return {
    errors,
    handleSubmit,
    onSubmit,
    register
  }

}