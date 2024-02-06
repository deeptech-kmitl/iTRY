"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import { useEffect, useState } from "react";
import Carroussel from "./components/Carousel/myCarousel";
import Card from "./components/Carousel/CardCarousel";

import CardRoutes from "./components/CardRoute";
import CardSponsor from "./components/CardSponsor"
import Map from "./components/GoogleMap";
import ActivityOpen from "./components/ActivityOpen";

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
      <UserLayout customClassName="md:pt-4">
        <ActivityOpen/>
        <div className="relative md:h-96 h-64 overflow-hidden">
          <Carroussel
            cards={cards}
            height="100%"
            width="100%"
            margin="0 auto"
            offset={1}
            showArrows={false}
            goToSlide={count}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:py-16">
         
            <div className="text-base md:text-2xl flex items-center">
              <p className="mr-2">กิจกรรมที่กำลังเปิดรับสมัคร</p>
              <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/more-than.png" alt="more-than" />
            </div>
  
          



          <div className="text-center py-12 md:py-16">
            <h1 className="text-base md:text-2xl">การเดินทางมาคณะเทคโนโลยีสารสนเทศ</h1>
          </div>
          <CardRoutes role='user' />
        </div>
        <div className="pt-6">
          <Map />
        </div>
        <div className="py-12 md:py-16">
          <div className="text-center pb-16">
            <h1 className="text-base md:text-2xl">ขอบคุณผู้สนับสนุน</h1>
          </div>
          <CardSponsor />
        </div>
      </UserLayout>

    </>
  )
}
