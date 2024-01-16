"use client";

import Image from 'next/image'

export default function CardRoutes() {
    const dummyRouteOption = [
        {
            optionTitle: 'แอร์พอร์ตลิ้งค์',
            detail: '',
            image: '/station.png',
        },
        {
            optionTitle: 'รถโดยสารประจำทาง',
            detail: '',
            image: '/bus.png',
        },
        {
            optionTitle: 'รถตู้',
            detail: '',
            image: '/van.png',
        },
        {
            optionTitle: 'รถไฟ',
            detail: '',
            image: '/train.png',
        }
    ]

    return (
        <div className='grid grid-cols-4 gap-10 px-36'>
            {
                dummyRouteOption.map((route, key) => 
                    <div key={key} className="card w-65 bg-base-100 border-solid border-2 border-[#40F8FF] py-10">
                        <figure>
                            <Image src={route.image} alt={route.optionTitle} width="100" height="100"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title justify-center">{route.optionTitle}</h2>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
