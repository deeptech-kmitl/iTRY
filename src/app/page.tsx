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
        <div className="h-96 md:h-500">
          <Carroussel
            cards={cards}
            height="100%"
            width="100%"
            margin="0 auto"
            offset={1}
            showArrows={false}
            goToSlide={count}
          />
        </div>
        <div className="py-16">
          <div className="text-2xl flex">กิจกรรมที่กำลังเปิดรับสมัคร<img width="35" height="35" src="https://img.icons8.com/ios-filled/50/FFFFFF/more-than.png" alt="more-than" /></div>
          <div className="bg-BlueO border-2 border-neonBlue rounded-xl my-5 flex grid gap-x-8 gap-y-4 grid-cols-4">
            {activity.map((item, key) =>
              <div key={key} className="flex p-5 justify-center">
                <img src={item.image} alt={item.title} width="80" height="80" className="rounded-image border-2 border-neonBlue" />
                <div className="text-center pt-5 px-2">
                  <p>{item.title}</p>
                  <p className="text-slate-400">{item.status}</p>
                </div>
              </div>)}
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
