import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import FAQ from "./FAQ";
import Timeline from "./Timeline";
import FollowButton from "../FollowButton";
import ShareSocial from "../ShareSocial";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import Link from "next/link";
import ITryButton from "../Button";
import { Fragment } from 'react';
import useUserController from "../Navbar/useUserController";

interface ActivityContainerProps {
  activity: ITryActivity
}

export default function ActivityContainer({ activity }: ActivityContainerProps) {

  return (
    <div>
      <div className="grid grid-cols-1 text-base md:text-2xl text-center font-bold">
        <p className="py-5">{activity.activityName}</p>
        <div className="bg-white h-[1px]"></div>
        <p className="py-5 text-neonBlue">กำลังเปิดรับสมัคร</p>
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
              {activity.phone.map((phoneData, index) => (
                <Fragment key={index}>
                  <span>{phoneData.phone}</span>
                  {index < activity.phone.length - 1 ? ', ' : ''}
                </Fragment>
              ))}
            </p>
          </div>
          <div className='flex py-2 md:py-4 items-center'>
            <FontAwesomeIcon icon={faEnvelope} className='h-4 md:h-8' />
            <p className='px-2 md:px-8 text-[13px] md:text-base'>{activity.email}</p>
          </div>
          <div className='relative flex pt-1 md:pt-7 items-center'>
            <div className="w-[100%] md:w-[75%]"><FollowButton activity={activity}  /></div>
            <div className='px-3'><ShareSocial /></div>
          </div>
        </div>
      </div>
      <div className='pt-0 md:pt-4 text-sm md:text-xl' >
        {/* รายละเอียดกิจกรรม */}
        <p className=' font-bold pt-1 md:pt-16 pb-6'>รายละเอียดกิจกรรม</p>
        <div className='bg-slate-900 p-4 rounded-lg'>
          {activity.activityDetails ? (<p dangerouslySetInnerHTML={{ __html: activity.activityDetails }} />) : <p className="text-stone-400">ไม่มีรายละเอียดกิจกรรม</p>}
        </div>

        {/* Social Media */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>Social Media</p>
        <div className='flex gap-3'>
          {activity.igLink && (
            <>
              <Link href={activity.igLink} target="_blank">
                <ITryButton customClassName='btn hover:bg-transparent bg-transparent border-none p-0' removeDefaultClassName >
                  <Image width="48" height="48" src="/instagram-icon2.png" alt='instagram' />
                </ITryButton>
              </Link>
            </>
          )}
          {activity.facebookLink && (
            <>
              <Link href={activity.facebookLink} target="_blank">
                <ITryButton customClassName='btn hover:bg-transparent bg-transparent border-none p-0' removeDefaultClassName >
                  <Image width="48" height="48" src="/facebook-icon.png" alt='facebook' />
                </ITryButton>
              </Link>
            </>
          )}
        </div>

        {/* กำหนดการกิจกรรม */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>กำหนดการกิจกรรม</p>
        <Timeline schedule={activity.schedule} />

        {/* FAQ */}
        <p className='text-sm md:text-xl font-bold pt-16 pb-6'>FAQ</p>
        <FAQ faq={activity.faq} />
      </div>
    </div>
  )
}