import { TypeAction, TypeActivity } from '@/app/components/ManageActivityPage/activity';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { createCamperActivity, updateCamperActivity } from '@/app/api/crudActivity/camper/route';
import { ITryActivity } from './activity';
import { createStaffActivity, updateStaffActivity } from '@/app/api/crudActivity/staff/route';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { uploadFileToS3 } from '@/app/api/uploadFile/route';
import { convertDateToString } from '../converDateToString';
import { updateNotification, updateNotificationEditActivity } from '@/app/api/notification/route';
import useUserController from '@/app/components/Navbar/useUserController';
import { Notification } from '../ManageEmail/email';

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
      activityDetails: yup.string().nullable(),
      schedule: yup.array().of(scheduleSchema).nullable(),
      facebookLink: yup.string().nullable(),
      igLink: yup.string().nullable(),
      applyLink: yup.string().nullable(),
      faq: yup.array().of(faqSchema).nullable(),
      phone: yup.array().of(phoneSchema).nullable(),
      email: yup.string().email("กรุณากรอกรูปแบบอีเมลให้ถูกต้อง").nullable(),
      jobPositions: yup.array().of(jobPositionsSchema).nullable()
    });


    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });


    const onSubmit = async (data: any) => {

      try {

        let savedData = { ...data }
        if (typeof (data.imageUrl) !== "string") {
          const imageUrl = data.imageUrl;
          const realImageUrl: any = await uploadFileToS3(imageUrl)
          savedData = { ...data, imageUrl: realImageUrl, typeActivity: typeActivity }
        }

        let result: { status: string; message?: unknown; activityId?: string };
        if (typeAction === "add") {
          result = typeActivity === "camper" ? await createCamperActivity(savedData) : await createStaffActivity(savedData)
        } else {
          if (typeActivity === "camper") {
            console.log("savedData", savedData)
            result = await updateCamperActivity(savedData)
          } else {
            result = await updateStaffActivity(savedData)
          }

          await updateNotificationEditActivity(savedData)

        }

        console.log("result", result)

        await Swal.fire({
          icon: "success",
          text: `${typeAction === "add" ? "เพิ่ม" : "แก้ไข"}กิจกรรมสำเร็จ`,
          showConfirmButton: false,
          timer: 1500
        });

        await router.push(`/${typeActivity}/activity-details/${result?.activityId}`);
        await router.refresh();
      } catch (e) {
        Swal.fire({
          icon: "error",
          text: `${typeAction === "add" ? "เพิ่ม" : "แก้ไข"}กิจกรรมไม่สำเร็จ!`,
      });
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