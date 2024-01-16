"use client"
import Image from "next/image";
import UserLayout from "./user/layout";
import Carousel from 'react-spring-3d-carousel';

export default function Home() {

  const slides = [
    {
      key: 0,
      content: <Image src="https://picsum.photos/800/800/?random" alt="1" width={500} height={500} />
    },
    {
      key: 1,
      content: <Image src="https://picsum.photos/800/800/?random" alt="2" width={500} height={500} />
    },
    {
      key: 2,
      content: <Image src="https://picsum.photos/600/800/?random" alt="3" width={500} height={500} />
    },
    {
      key: 3,
      content: <Image src="https://picsum.photos/800/500/?random" alt="4" width={500} height={500} />
    },
    {
      key: 4,
      content: <Image src="https://picsum.photos/800/800/?random" alt="5" width={500} height={500} />
    },
    {
      key: 5,
      content: <Image src="https://picsum.photos/500/800/?random" alt="6" width={500} height={500} />
    },
    {
      key: 6,
      content: <Image src="https://picsum.photos/800/600/?random" alt="7" width={500} height={500} />
    },
    {
      key: 7,
      content: <Image src="https://picsum.photos/800/800/?random" alt="8" width={500} height={500} />
    }
  ];

  return (
    <>
      <UserLayout customClassName="pt-4">
        <Carousel slides={slides} showNavigation />
      </UserLayout>
    </>
  )
}
