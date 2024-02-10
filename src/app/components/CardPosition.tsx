"use client";

export default function CardPosition() {
    const dummyRouteOption = [
        {
            position: 'สวัสดิการ',
            amount: 9,
        },
        {
            position: 'ทะเบียน',
            amount: 3,
        },
        {
            position: 'สถานที่',
            amount: 6,
        },
        {
            position: 'ประสานงาน',
            amount: 20,
        },
        {
            position: 'พยาบาล',
            amount: 5,
        },
        {
            position: 'การ์ด',
            amount: 10,
        },
    ]
    return (
        <div className='grid grid-cols-6 place-items-center'>
                {
                    dummyRouteOption.map((route, key) => 
                        <div 
                        key={key} 
                        className="card w-40 h-56 bg-base-100 border-solid border-2 border-neonBlue rounded-md">
                            <div className="py-2 h-[50%] bg-lightBlue flex justify-center text-center">
                                <h5 className="card-title justify-center text-xl text-black">{route.position}</h5>
                            </div>
                            <div className="py-2 h-[50%] bg-[#2B79A4] flex flex-col justify-center items-center">
                                <h5 className="text-xs">จำนวน</h5>
                                <h5 className="card-title text-2xl pt-2">{route.amount}</h5>
                            </div>
                        </div>
                    )
                }
            </div>
    )
}