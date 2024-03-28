"use client";

import React from "react";
import CardRoutes from "../CardRoute";
import Card from "../Carousel/CardCarousel";
import { ApiDataList, ApiError } from "../global";
import Image from "next/image";
import { useState, useEffect } from "react";

interface TravelContainerProps {
  route: any;
}

export default function TravelContainer(route: TravelContainerProps) {

  return (
    <div className="text-center py-12 md:py-16 flex justify-center">
      <CardRoutes role={"user"} route={route.route.data} />
    </div>
  );
}
