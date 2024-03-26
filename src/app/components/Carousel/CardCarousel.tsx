"use client"

import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";

interface CardProps {
  imagen: string;
}

function Card({ imagen }: CardProps) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Image priority className="aspect-video w-full" src={imagen} alt="" width={500} height={500}  layout="responsive"  />
    </animated.div>
  );
}

export default Card;
