"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import { useEffect, useState } from "react";
import Carroussel from "./components/Carousel/myCarousel";
import Card from "./components/Carousel/CardCarousel";

import CardRoutes from "./components/CardRoute";
import CardSponsor from "./components/CardSponsor"
import Map from "./components/GoogleMap";


export default function Home() {
  const cards = [
    {
      key: 0,
      content: <Card imagen="/open_house.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    },
    {
      key: 1,
      content: <Card imagen="/itcamp19.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    },
    {
      key: 2,
      content: <Card imagen="/unitecamp.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    },
    {
      key: 3,
      content: <Card imagen="/open_house.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    },
    {
      key: 4,
      content: <Card imagen="/itcamp19.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    },
    {
      key: 5,
      content: <Card imagen="/unitecamp.png" />,
      title: 'Open House',
      status: 'กำลังเปิดรับสมัคร',
    }
  ];

  const activity = [{
    key: 0,
    image: "/open_house.png",
    title: 'Open House',
    status: 'กำลังเปิดรับสมัคร',
  },
  {
    key: 1,
    image: "/itcamp19.png",
    title: 'Open House',
    status: 'กำลังเปิดรับสมัคร',
  },
  {
    key: 2,
    image: "/unitecamp.png",
    title: 'Open House',
    status: 'กำลังเปิดรับสมัคร',
  },
  {
    key: 3,
    image: "/open_house.png",
    title: 'Open House',
    status: 'กำลังเปิดรับสมัคร',
  },
  ]

  const [count, setCount] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <UserLayout customClassName="pt-4">
        <div className="hidden md:block h-96">
          <Carroussel
            cards={cards}
            height="100%"
            width="100%"
            margin="0 auto"
            offset={1}
            showArrows={false}
            goToSlide={count}
            className="w-full h-full"
          />
        </div>
        <div className="py-16">
          <div className="flex-grow flex flex-col">
            <div className="text-lg md:text-2xl flex  md:flex-row items-center md:items-start">
              <p className="mr-2">กิจกรรมที่กำลังเปิดรับสมัคร</p>
              <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/more-than.png" alt="more-than" />
            </div>
            <div className="bg-BlueO border-2 border-neonBlue rounded-xl my-5 flex flex-wrap justify-center gap-4 max-w-full">
              {activity.slice(0, 6).map((item, key) => (
                <div key={key} className="flex flex-col items-center p-3 md:p-5 max-w-xs">
                  <img src={item.image} alt={item.title} width="120" height="120" className="object-cover w-full h-full rounded-image border-2 border-neonBlue" />
                  <div className="text-center pt-3">
                    <p className="text-sm md:text-ls">{item.title}</p>
                    <p className="text-xs md:text-base text-slate-400">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="text-center py-16">
            <h1 className="text-2xl">การเดินทางมาคณะเทคโนโลยีสารสนเทศ</h1>
          </div>
          <CardRoutes />
        </div>
        <div className="pt-6 pb-16 px-10">
          <Map />
        </div>
        <div className="py-16">
          <div className="text-center pb-16">
            <h1 className="text-2xl">ขอบคุณผู้สนับสนุน</h1>
          </div>
          <CardSponsor />
        </div>
      </UserLayout>

    </>
  )
}
