"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import { useEffect, useState } from "react";
import Carroussel from "./components/Carousel/myCarousel";
import Card from "./components/Carousel/CardCarousel";
import CardRoutes from "./components/CardRoute";

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
      </UserLayout>
      <div className="px-24 py-16">
        <div className="text-center pb-16">
          <h1 className="text-2xl">การเดินทางมาคณะเทคโนโลยีสารสนเทศ</h1>
        </div>
        <CardRoutes />
      </div>
    </>
  )
}
