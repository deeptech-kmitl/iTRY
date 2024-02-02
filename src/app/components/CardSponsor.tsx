"use client";

import Image from 'next/image'

export default function CardSponsor() {
    const items = []
    const colCount = Math.min(items.length, 5)
    const dummyRouteOption = [
        {
            sponsorImage: '/test_sponsor_pepsi.png',
        },
        {
            sponsorImage: '/test_sponsor_lactasoi.png',
        },
        {
            sponsorImage: '/test_sponsor_amazoncafe.png',
        },
        {
            sponsorImage: '/test_sponsor_mama.png',
        },
        {
            sponsorImage: '/test_sponsor_major.jpg',
        },
    ]

    return (
        <div className={`grid grid-cols-3 md:grid-cols-5  place-items-center gap-4`}>
    {
        dummyRouteOption.map((sponsor, key) => 
            <div key={key} className="flex justify-center w-full md:w-full h-full overflow-hidden">
                <figure className="w-full h-full">
                    <Image className="" src={sponsor.sponsorImage} alt={sponsor.sponsorImage} 
                    width="180" height="180" layout="responsive" objectFit='cover' />
                </figure>
            </div>
        )
    }
</div>
    )
}