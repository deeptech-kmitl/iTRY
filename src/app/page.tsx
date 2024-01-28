"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import { useEffect, useState } from "react";
import Carroussel from "./components/Carousel/myCarousel";
import Card from "./components/Carousel/CardCarousel";

import CardRoutes from "./components/CardRoute";
import CardSponsor from "./components/CardSponsor"
import Map from "./components/GoogleMap";
import DetailActive from "./components/DetailActivity";

export default function Home() {
  const cards = [
    {
      key: 0,
      content: <Card imagen="/open_house.png" />
    },
    {
      key: 1,
      content: <Card imagen="/itcamp19.png" />
    },
    {
      key: 2,
      content: <Card imagen="/unitecamp.png" />
    },
    {
      key: 3,
      content: <Card imagen="/open_house.png" />
    },
    {
      key: 4,
      content: <Card imagen="/itcamp19.png" />
    },
    {
      key: 5,
      content: <Card imagen="/unitecamp.png" />
    }
  ];

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
        {/* <DetailActive/> */}
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
          <div className="text-center pb-16">
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
