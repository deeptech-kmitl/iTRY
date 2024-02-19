"use client"

import { useEffect, useState } from "react";
import Carroussel from "../Carousel/myCarousel";
import Card from './../Carousel/CardCarousel';
import { ApiDataList, ApiError } from "../global";
import { BannerData } from "../BannerPage/BannerPage";

interface BannerContainerProps {
  bannersData: ApiDataList<BannerData> | ApiError | undefined
}

export default function BannerContainer({ bannersData }: BannerContainerProps) {
  if (bannersData?.status === 'error') {
    // Handle error case
    return <div>Error</div>;
  } else if (Array.isArray(bannersData?.data)) {

    const cards = bannersData?.data?.map((banner, index) => {
      return {
        key: index,
        content: <Card imagen={banner.bannerUrl} />,
      }
    })

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

  } else {
    // Handle undefined or other cases
    return <div>No data available</div>;
  }

}