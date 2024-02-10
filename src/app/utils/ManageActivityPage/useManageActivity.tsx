import { uploadFileToS3 } from '@/app/api/create/staffActivity/route';
import { TypeAction, TypeActivity } from '@/app/components/ManageActivityPage/activity';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { createCamperActivity } from '@/app/api/allActivity/camper/route';
import { ITryActivity } from './activity';

interface UseManageActivityProps {
  typeAction: TypeAction
  typeActivity: TypeActivity
}


type keySchema = "activityName" | "openDate" | "closeDate" | "visibility" | "activityDetails" | "schedule" | "facebookLink"

export default function useManageActivity({ typeAction, typeActivity }: UseManageActivityProps) {

  const scheduleSchema = yup.object({
    date: yup.string().required('กรุณากรอกวันที่ไทม์ไลน์'),
    title: yup.string().required('กรุณากรอกหัวข้อไทม์ไลน์'),
    details: yup.string().required('กรุณากรอกรายละเอียดไทม์ไลน์'),
  });

  const faqSchema = yup.object({
    question: yup.string().required('กรุณากรอกคำถาม'),
    answer: yup.string().required('กรุณากรอกคำตอบ'),
  });

  const phoneSchema = yup.object({
    phone: yup.string().matches(/^[0-9]+$/, 'กรุณากรอกรูปแบบโทรศัพท์ให้ถูกต้อง').required('กรุณากรอกเบอร์โทรศัพท์'),
  });

  const jobPositionsSchema = yup.object({
    name: yup.string().required('กรุณากรอกชื่อตำแหน่ง'),
    amount: yup.number().required('กรุณากรอกจำนวนที่รับสมัคร').typeError('กรุณากรอกจำนวนที่รับสมัคร'),
  });

  const camperSchema = yup.object().shape({
    image: yup.mixed().required("กรุณาใส่รูปภาพกิจกรรม"),
    activityName: yup.string().required('กรุณากรอกชื่อกิจกรรม'),
    openDate: yup.string().required('กรุณาระบุวันที่เริ่มรับสมัครของกิจกรรม'),
    closeDate: yup.string().required('กรุณาระบุวันที่สิ้นสุดรับสมัครของกิจกรรม'),
    visibility: yup.string().required('กรุณาเลือกการมองเห็น'),
    activityDetails: yup.string(),
    schedule: yup.array().of(scheduleSchema),
    facebookLink: yup.string(),
    igLink: yup.string(),
    applyLink: yup.string(),
    faq: yup.array().of(faqSchema),
    phone: yup.array().of(phoneSchema),
    email: yup.string().email("กรุณากรอกรูปแบบอีเมลให้ถูกต้อง"),
    jobPositions: yup.array().of(jobPositionsSchema)
  });

  const staffSchema = camperSchema.concat(
    yup.object().shape({
      position: yup.array().of(jobPositionsSchema),
    })
  );

  const schema = typeActivity === "camper" ? camperSchema : staffSchema;

  const fetchActivityData = async () => {
    const returnObject: ITryActivity = {
      imageUrl: "",
      activityName: 'Default Activity Name',
      openDate: 'Default Start Date',
      closeDate: 'Default End Date',
      visibility: "outsider",
      activityDetails: 'Default Activity Detail',
      schedule: [],
      facebookLink: "",
      igLink: "",
      applyLink: "",
      faq: [],
      phone: [],
      email: "",
      jobPositions: [],
    }
    return returnObject;
  }


  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data: any) => {
    const image = data.image;
    const imageUrl: any = await uploadFileToS3(image)
    const savedData = { ...data, imageUrl: imageUrl }
    const result = await createCamperActivity(savedData)
    console.log("result", result)
  }

  useEffect(() => {
    const setDefaultValues = async () => {
      if (typeAction === "edit") {
        const defaultValues = await fetchActivityData();
        Object.keys(defaultValues).forEach((fieldName) => {
          const key = fieldName as keySchema;
          setValue(key, defaultValues[key]);
        });
      }
    };

    setDefaultValues();
  }, [typeAction, setValue]);


  return {
    register,
    setValue,
    watch,
    handleSubmit,
    errors,
    onSubmit
  }

}