import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import FAQ from "./FAQ";
import Timeline from "./Timeline";
import FollowButton from "../FollowButton";
import ShareSocial from "../ShareSocial";
import { ITryActivity, ScheduleActivity } from "@/app/utils/ManageActivityPage/activity";
import Link from "next/link";
import ITryButton from "../Button";
import { Fragment, ReactNode } from 'react';
import sortDateAsc from "@/app/utils/sortingFunction";
import CardPosition from "../CardPosition";

interface ActivityContainerProps {
  activity: ITryActivity
}

export default function ActivityContainer({ activity }: ActivityContainerProps) {

  const getTextDate: string | ReactNode = activity?.applyLink ? (
    <>
      สามารถสมัครได้ที่ :{" "}
      <Link target="_blank" href={activity?.applyLink} className="text-gray-500">
        {activity?.applyLink}
      </Link>
    </>
  ) : (
    "กดติดตามเพื่อรอช่องทางการสมัครจากกิจกรรม"
  )

  const combinedSchedule: ScheduleActivity[] = [
    {
      date: activity.openDate,
      title: "วันเปิดรับการสมัคร",
      details: getTextDate
    },
    {
      date: activity.closeDate,
      title: "วันปิดรับการสมัคร",
      details: getTextDate
    },
    ...(activity?.schedule || [])
  ].sort((a, b) => sortDateAsc(a.date, b.date))
  
  const renderStatusActivity = () => {
    const today = new Date();
    const openDate = new Date(activity.openDate)
    const closeDate = new Date(activity.closeDate)

    if (today < openDate) {
      const dayDifference = Math.ceil((openDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `ใกล้เปิดรับสมัครแล้ว (อีก ${dayDifference} วันจะเปิดรับสมัคร)`;
    } else if (today >= openDate && today <= closeDate) {
      const dayDifference = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `กำลังเปิดรับสมัคร (อีก ${dayDifference} วันจะปิดรับสมัคร)`;
    } else if (today > closeDate) {
      return 'กิจกรรมนี้กำลังดำเนินการ';
    } else {
      return 'กิจกรรมนี้จบลงแล้ว ขอบคุณทุกที่สนับสนุน';
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 text-base md:text-2xl text-center font-bold">
        <p className="py-5">{activity?.activityName}</p>
        <div className="bg-white h-[1px]"></div>
        <p className="py-5 text-neonBlue">{renderStatusActivity()}</p>
      </div>

      {/* ช่องทางการติดต่อสอบถาม */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-sm md:text-xl py-1 md:py-8">
        <div>
          <Image src="/open_house.png" alt="image_activity" width="0" height="0" sizes="100vw" className="w-full h-auto rounded-lg border aspect-video w-full object-cover object-center" />
        </div>
        <div className='pl-0 md:pl-12 py-6 md:py-0 px-8 md:px-0'>
          <p className='font-bold py-1'>ช่องทางการติดต่อสอบถาม</p>
          <div className='flex py-2 md:py-4 items-center'>
            <FontAwesomeIcon icon={faPhone} className='h-4 md:h-8' />
            <p className='px-2 md:px-8 text-[13px] md:text-base'>
              {activity?.phone ? (
                <>
                {activity?.phone?.map((phoneData, index) => (
                <Fragment key={index}>
                  <span>{phoneData?.phone}</span>
                  {index < activity?.phone?.length - 1 ? ', ' : ''}
                </Fragment>
              ))}
                </>
              ) : (
                <span>ไม่มีเบอร์โทรศัพท์</span>
              )}
            </p>
          </div>
          <div className='flex py-2 md:py-4 items-center'>
            <FontAwesomeIcon icon={faEnvelope} className='h-4 md:h-8' />
            <p className='px-2 md:px-8 text-[13px] md:text-base'>{activity?.email ? activity?.email : "ไม่มีอีเมล"}</p>
          </div>
          <div className='relative flex pt-1 md:pt-7 items-center'>
            <div className="w-[100%] md:w-[75%]"><FollowButton activity={activity}  /></div>
            <div className='px-3'><ShareSocial /></div>
          </div>
        </div>
      </div>
      <div className="">
        <div className='grid grid-cols-6 place-items-center'>
          {activity?.jobPositions.map((job, index) => (
            <CardPosition key={index} {...job} />
          ))}
        </div>
      </div>
      <div className='pt-0 md:pt-4 text-sm md:text-xl' >
        {/* รายละเอียดกิจกรรม */}
        <p className=' font-bold pt-1 md:pt-16 pb-6'>รายละเอียดกิจกรรม</p>
        <div className='bg-slate-900 p-4 rounded-lg'>
          {activity?.activityDetails ? (<p dangerouslySetInnerHTML={{ __html: activity.activityDetails }} />) : <p className="text-stone-400">ไม่มีรายละเอียดกิจกรรม</p>}
        </div>

        {/* Social Media */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>Social Media</p>
        <div className='flex gap-3'>
          {(!activity.igLink && !activity.facebookLink) && (
            <p className='px-2 md:px-8 text-[13px] md:text-base'>ไม่มี Social Media</p>
          )}
          {activity?.igLink && (
            <>
              <Link href={activity.igLink} target="_blank">
                <ITryButton customClassName='btn hover:bg-transparent bg-transparent border-none p-0' removeDefaultClassName >
                  <Image width="48" height="48" src="/instagram-icon2.png" alt='instagram' />
                </ITryButton>
              </Link>
            </>
          )}
          {activity?.facebookLink && (
            <>
              <Link href={activity?.facebookLink} target="_blank">
                <ITryButton customClassName='btn hover:bg-transparent bg-transparent border-none p-0' removeDefaultClassName >
                  <Image width="48" height="48" src="/facebook-icon.png" alt='facebook' />
                </ITryButton>
              </Link>
            </>
          )}
        </div>

        {/* กำหนดการกิจกรรม */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>กำหนดการกิจกรรม</p>
        <Timeline schedule={combinedSchedule} />

        {/* FAQ */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>FAQ</p>
        <FAQ faq={activity?.faq} />
      </div>
    </div>
  )
}