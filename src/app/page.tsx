"use server";
import React from "react";
import Map from "./components/GoogleMap";
import RegisteringActivitiesContainer from "./components/Home/RegisteringActivitiesContainer";
import SponsorContainer from "./components/Home/SponsorContainer";
import TravelContainer from "./components/Home/TravelContainer";
import UserLayout from "./user/layout";
import BannerServer from "./components/Home/BannerServer";
import AllActivitiesServer from "./components/Home/AllActivitiesServer";
import IncomingServer from "./components/Home/IncomingServer";

export default async function Home() {
  return (
    <>
      <UserLayout>
        <BannerServer />
        <IncomingServer />
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
