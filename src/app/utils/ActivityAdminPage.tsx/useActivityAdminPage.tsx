"use client"

import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function useActivityAdminPage() {

  const router = useRouter()

  const [isOpen, setOpen] = useState<boolean>(false)

  const openTypeActivity = () => {
    setOpen(true)
  }

  const closeTypeActivity = () => {
    setOpen(false)
  }
  
  const schema = yup.object().shape({
    typeActivity: yup.string().required('กรุณาเลือกประเภทของกิจกรรม'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { typeActivity } = data;
    router.push(`/admin/activity/${typeActivity}/add`)
  }
  

  return {
    isOpen,
    openTypeActivity,
    closeTypeActivity,
    register,
    handleSubmit,
    onSubmit,
    errors
  }

}