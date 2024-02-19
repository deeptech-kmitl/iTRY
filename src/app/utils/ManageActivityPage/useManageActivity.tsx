import { uploadFileToS3 } from '@/app/api/create/staffActivity/route';
import { TypeAction, TypeActivity } from '@/app/components/ManageActivityPage/activity';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { createCamperActivity, updateCamperActivity } from '@/app/api/crudActivity/camper/route';
import { ITryActivity } from './activity';
import { createStaffActivity, updateStaffActivity } from '@/app/api/crudActivity/staff/route';
import ITryToastNotification from '@/app/components/Toast/ToastNotification';
import { useRouter } from 'next/navigation';

interface UseManageActivityProps {
  typeAction: TypeAction
  typeActivity: TypeActivity
  activity?: ITryActivity;
}


type KeySchema =
  "imageUrl" |
  "activityName" |
  "openDate" |
  "closeDate" |
  "visibility" |
  "activityDetails" |
  "schedule" |
  "facebookLink" |
  "igLink" |
  "applyLink" |
  "faq" |
  "phone" |
  "email" |
  "jobPositions"

  export default function useManageActivity({ typeAction, typeActivity, activity }: UseManageActivityProps) {

    const router = useRouter()

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

    const schema = yup.object().shape({
      imageUrl: yup.mixed().required("กรุณาใส่รูปภาพกิจกรรม"),
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


    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });


    const onSubmit = async (data: any) => {
      let savedData = { ...data }
      if (typeof (data.imageUrl) !== "string") {
        const imageUrl = data.imageUrl;
        const realImageUrl: any = await uploadFileToS3(imageUrl)
        savedData = { ...data, imageUrl: realImageUrl, typeActivity: typeActivity }
      }
      try {
        let result: { status: string; message?: unknown; activityId?: string };
        if (typeAction === "add") {
          result = typeActivity === "camper" ? await createCamperActivity(savedData) : await createStaffActivity(savedData)
        } else {
          result = typeActivity === "camper" ? await updateCamperActivity(savedData) : await updateStaffActivity(savedData)
        }

        console.log("result", result)

        await ITryToastNotification({
          type: "success",
          text: "เพิ่มกิจกรรมสำเร็จ"
        })

        if (result && result.status === "success" && result?.activityId) {
          await ITryToastNotification({
            type: "success",
            text: "เพิ่มกิจกรรมสำเร็จ"
          });

          router.push(`/${typeActivity}/activity-details/${result?.activityId}`);
        }
      } catch (e) {
        console.log("e", e)
      }



    }

    useEffect(() => {
      const setDefaultValues = async () => {
        if (typeAction === "edit" && activity) {
          Object.keys(activity).forEach((fieldName) => {
            const getKeySchemaType = (fieldName: any) => {
              return fieldName as KeySchema
            }
            const key = getKeySchemaType(fieldName);
            setValue(key, activity[key]);
          });
        }
      };

      setDefaultValues();
    }, []);


    return {
      register,
      setValue,
      watch,
      handleSubmit,
      errors,
      onSubmit,
    }

  }