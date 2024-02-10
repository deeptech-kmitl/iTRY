"use client";

const dummySponsor = [
    {
        image: '/test_sponsor_amazoncafe.png'
    },
    {
        image: '/test_sponsor_lactasoi.png'
    },
    {
        image: '/test_sponsor_major.jpg'
    },
    {
        image: '/test_sponsor_mama.png'
    },
    {
        image: '/test_sponsor_pepsi.png'
    }

]

export const SponsorAdmin = () => {
    return (
        <div className='grid grid-cols-4 place-items-center'>
            {dummySponsor.map((route, key) => 
            <div key={key} className="card w-48 bg-base-100 shadow-xl mb-10">
            <figure><img src={route.image} alt={route.image} /></figure>
            <div className="card-body">
              <div className="card-actions justify-center">
                <button className="btn bg-cyan-500 px-20 text-slate-800 text-lg">ลบ</button>
              </div>
            </div>
          </div>
            )}
        </div>
    )
}