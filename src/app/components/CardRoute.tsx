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
        <div className='grid grid-cols-4 place-items-center'>
            {
                dummyRouteOption.map((route, key) => 
                    <div key={key} className="card w-44 bg-base-100 border-solid border-2 border-neonBlue pt-3 rounded-md ">
                        <div className="px-3">
                            <figure className="border-[1px] border-white py-8 rounded-3xl">
                                <Image src={route.image} alt={route.optionTitle} width="100" height="100"/>
                            </figure>
                        </div>
                        <div className="py-2">
                            <h5 className="card-title justify-center text-sm text-center">{route.optionTitle}</h5>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
