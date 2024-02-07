import { TypeAction, TypeActivity } from '@/app/components/ManageActivityPage/activity';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface UseManageActivityProps {
  typeAction: TypeAction
  typeActivity: TypeActivity
}


type keySchema = "activityName" | "registerDateStart" | "registerDateEnd" | "viewBy" | "activityDetail"

export default function useManageActivity({ typeAction, typeActivity }: UseManageActivityProps) {

  const timelineSchema = yup.object({
    date: yup.string().required('กรุณากรอกวันที่ไทม์ไลน์'),
    title: yup.string().required('กรุณากรอกหัวข้อไทม์ไลน์'),
    description: yup.string().required('กรุณากรอกรายละเอียดไทม์ไลน์'),
    index: yup.number(),
  });

  const faqSchema = yup.object({
    question: yup.string().required('กรุณากรอกคำถาม'),
    answer: yup.string().required('กรุณากรอกคำตอบ'),
    index: yup.number(),
  });

  const phoneSchema = yup.object({
    phone: yup.string().matches(/^[0-9]+$/, 'กรุณากรอกรูปแบบโทรศัพท์ให้ถูกต้อง').required('กรุณากรอกเบอร์โทรศัพท์'),
  });

  const positionSchema = yup.object({
    name: yup.string().required('กรุณากรอกชื่อตำแหน่ง'),
    amount: yup.number().required('กรุณากรอกจำนวนที่รับสมัคร').typeError('กรุณากรอกจำนวนที่รับสมัคร'),
    index: yup.number(),
  });

  const campeSchema = yup.object().shape({
    image: yup.mixed().required("กรุณาใส่รูปภาพกิจกรรม"),
    activityName: yup.string().required('กรุณากรอกชื่อกิจกรรม'),
    registerDateStart: yup.string().required('กรุณาระบุวันที่เริ่มรับสมัครของกิจกรรม'),
    registerDateEnd: yup.string().required('กรุณาระบุวันที่สิ้นสุดรับสมัครของกิจกรรม'),
    viewBy: yup.string().required('กรุณาเลือกการมงเห็น'),
    activityDetail: yup.string(),
    timeLine: yup.array().of(timelineSchema),
    facebookLink: yup.string(),
    igLink: yup.string(),
    registerLink: yup.string(),
    faq: yup.array().of(faqSchema),
    phone: yup.array().of(phoneSchema),
    email: yup.string().email("กรุณากรอกรูปแบบอีเมลให้ถูกต้อง"),
    position: yup.array().of(positionSchema)
  });

  const staffSchema = campeSchema.concat(
    yup.object().shape({
      position: yup.array().of(positionSchema),
    })
  );

  const schema = typeActivity === "camper" ? campeSchema : staffSchema;

  const fetchActivityData = async () => {
    const returnObject = {
      activityName: 'Default Activity Name',
      registerDateStart: 'Default Start Date',
      registerDateEnd: 'Default End Date',
      viewBy: 'Default View By',
      activityDetail: 'Default Activity Detail',
    }
    return returnObject;
  }


  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data: any) => {
    console.log(data)
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