import Image from 'next/image'
import Timeline from '../../components/DetailActivity/Timeline'
import FAQ from '../../components/DetailActivity/FAQ'
import CardPosition from '../../components/CardPosition'
import FollowButton from '../../components/FollowButton'
import ITryButton from '../../components/Button'
import ShareSocial from '../../components/ShareSocial'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function DetailActive() {
    return (
        <div>
            <div className="grid grid-cols-1 text-base md:text-2xl text-center font-bold">
                <p className="py-5">IT Ladkrabang Open House 2023</p>
                <div className="bg-white h-[1px]"></div>
                <p className="py-5 text-neonBlue">กำลังเปิดรับสมัคร</p>
            </div>

            {/* ช่องทางการติดต่อสอบถาม */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm md:text-xl py-1 md:py-8">
                <div>
                    <Image src="/open_house.png" alt="image_activity" width="0" height="0" sizes="100vw" className="w-full h-auto rounded-lg border" />
                </div>
                <div className='pl-0 md:pl-12 py-6 md:py-0 px-8 md:px-0'>
                    <p className='font-bold py-1'>ช่องทางการติดต่อสอบถาม</p>
                    <div className='flex py-2 md:py-4 items-center'>
                        <FontAwesomeIcon icon={faPhone} className='h-4 md:h-8' />
                        <p className='px-2 md:px-8 text-[13px] md:text-base'>080-172-5376, 02-723-4900 ต่อ 4938-4945</p>
                    </div>
                    <div className='flex py-2 md:py-4 items-center'>
                        <FontAwesomeIcon icon={faEnvelope} className='h-4 md:h-8' />
                        <p className='px-2 md:px-8 text-[13px] md:text-base'>openhouse@it.kmitl.ac.th</p>
                    </div>
                    <div className='relative flex pt-1 md:pt-7'>
                        <div className="w-[100%] md:w-[75%]"><FollowButton/></div>
                        <div className='px-3'><ShareSocial /></div>
                    </div>
                </div>
            </div>
            <div className='pt-0 md:pt-4 text-sm md:text-xl' >
                {/* รายละเอียดกิจกรรม */}
                <p className=' font-bold pt-1 md:pt-16 pb-6'>รายละเอียดกิจกรรม</p>
                <div className='bg-slate-900 p-4 rounded-lg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ex incidunt facilis natus rerum similique maxime animi assumenda esse, recusandae a, accusamus quia nemo numquam cum inventore tempore eaque aliquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis officia doloremque minima consectetur minus! Cum, deserunt explicabo magnam eum consequuntur corrupti et sequi aperiam odit labore voluptatem rem nesciunt id. Lorem ipsum, dolor sit amet consectetur adipisicing elit. At tempore reprehenderit autem commodi quibusdam expedita atque officia quis, cumque asperiores doloribus, exercitationem aliquam, vitae est. Tempora omnis possimus in facere.</p>
                    <br></br>
                    <p>เงื่อนไขกิจกรรม :</p>
                    <p> • B.A.D COIN จะอัปเดตภายใน 24 ชั่วโมง หลังจากร่วมกิจกรรมเสร็จสิ้น</p>
                    <div className='pt-10 relative'>
                        <ITryButton size='small' customClassName='absolute top-0 right-0 text-black bg-gradient-to-l from-orange-500 to-yellow-300'>สมัครกิจกรรม</ITryButton>
                    </div>
                </div>

                {/* Social Media */}
                <p className='text-sm md:text-xl font-bold pt-16 pb-6'>Social Media</p>
                <div className='flex gap-3'>
                    <button className='btn bg-transparent border-none p-0'>
                        <Image width="48" height="48" src="/instagram-icon2.png" alt='instagram'/>
                    </button>
                    <button className='btn bg-transparent border-none p-0'>
                        <Image width="48" height="48" src="/facebook-icon.png" alt='facebook' />
                    </button>
                </div>
                
                {/* กำหนดการกิจกรรม */}
                <p className='text-sm md:text-xl font-bold pt-16 pb-6'>กำหนดการกิจกรรม</p>
                <Timeline/>

                {/* FAQ */}
                <p className='text-sm md:text-xl font-bold pt-16 pb-6'>FAQ</p>
                <FAQ/>
            </div>
        </div>
    )
}