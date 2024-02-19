"use server";
import React from "react";
import CardRoutes from "./components/CardRoute";
import CardSponsor from "./components/CardSponsor";
import Map from "./components/GoogleMap";
import { Coming } from "./components/Coming";
import { getBanner } from '@/app/api/banner/route';
import BannerContainer from "./components/Home/BannerContainer";
import { getActivitiesDesc } from "./api/sortActivity/[user]/desc/route";
import IncomingContainer from "./components/Home/IncomingContainer";
import AllActivitiesContainer from "./components/Home/AllActivitiesContainer";
import RegisteringActivitiesContainer from "./components/Home/RegisteringActivitiesContainer";
import SponsorContainer from "./components/Home/SponsorContainer";
import TravelContainer from "./components/Home/TravelContainer";
import { ApiDataList, ApiError } from "./components/global";
import { ActivityApiData, ITryActivityCard } from "./utils/ManageActivityPage/activity";
import UserLayout from "./user/layout";
import BannerServer from "./components/Home/BannerServer";
import AllActivitiesServer from "./components/Home/AllActivitiesServer";

export default async function Home() {
  return (
    <>
      <UserLayout>
        <BannerServer />
        <IncomingContainer />
        <AllActivitiesServer />
        <RegisteringActivitiesContainer />
        <TravelContainer />
        <div className="pt-6">
          <Map />
        </div>
        <SponsorContainer />
      </UserLayout>
    </>
  );
}
