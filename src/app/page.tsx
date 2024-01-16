"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import Carousel from 'react-spring-3d-carousel';
import { useEffect, useRef, useState } from "react";
import { config } from "react-spring";
import Carroussel from "./components/Carousel/myCarousel";
import Card from "./components/Carousel/CardCarousel";

export default function Home() {

  const cards = [
    {
      key: 0,
      content: <Image alt="1" src="/d0d300f5-30f5-4792-9375-f014e1ba199f.jpg" width={500} height={500} />
    },
    {
      key: 1,
      content: <Card imagen="/d0d300f5-30f5-4792-9375-f014e1ba199f.jpg" />
    },
    {
      key: 2,
      content: <Card imagen="/d0d300f5-30f5-4792-9375-f014e1ba199f.jpg" />
    },
    {
      key: 3,
      content: <Card imagen="/d0d300f5-30f5-4792-9375-f014e1ba199f.jpg" />
    },
    {
      key: 4,
      content: <Card imagen="/d0d300f5-30f5-4792-9375-f014e1ba199f.jpg" />
    },
  ];

  const [count, setCount] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <UserLayout customClassName="pt-4">
        <div>test</div>
        <div style={{ height: 500 }}>
          <Carroussel
            cards={cards}
            height="500px"
            width="30%"
            margin="0 auto"
            offset={1}
            showArrows={false}
            goToSlide={count}
          />
        </div>
      </UserLayout>
    </>
  )
}
