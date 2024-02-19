"use client"

import { useEffect, useState } from "react";
import Carroussel from "../Carousel/myCarousel";
import Card from './../Carousel/CardCarousel';

export default function BannerContainer() {
  const cards = [
    {
      key: 0,
      content: <Card imagen="/open_house.png" />,

      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
    {
      key: 1,
      content: <Card imagen="/itcamp19.png" />,

      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
    {
      key: 2,
      content: <Card imagen="/unitecamp.png" />,

      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
    {
      key: 3,
      content: <Card imagen="/open_house.png" />,

      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
    {
      key: 4,
      content: <Card imagen="/itcamp19.png" />,

      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
    {
      key: 5,
      content: <Card imagen="/unitecamp.png" />,
    },
    {
      title: "Open House",
      status: "กำลังเปิดรับสมัคร",
    },
  ];


  const [count, setCount] = useState(1);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);
  
  return (
    <div className="relative md:h-96 h-64 overflow-hidden object-cover">
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
  )

}