"use server";

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./components/GoogleMap'), { ssr: false });
const RegisteringActivitiesContainer = dynamic(() => import('./components/Home/RegisteringActivitiesContainer'), { ssr: false });
const TravelContainer = dynamic(() => import('./components/Home/TravelContainer'), { ssr: false });
const UserLayout = dynamic(() => import('./user/layout'), { ssr: false });
const BannerServer = dynamic(() => import('./components/Home/BannerServer'), { ssr: false });
const AllActivitiesServer = dynamic(() => import('./components/Home/AllActivitiesServer'), { ssr: false });
const IncomingServer = dynamic(() => import('./components/Home/IncomingServer'), { ssr: false });
const SponsorServer = dynamic(() => import('./components/Home/SponsorServer'), { ssr: false });


export default async function Home() {
  return (
    <>
      <UserLayout customClassName="flex flex-col gap-8">
        <BannerServer />
        <IncomingServer />
        <AllActivitiesServer />
        <RegisteringActivitiesContainer />
        <TravelContainer />
        <div className="pt-6">
          <Map />
        </div>
        <SponsorServer />
      </UserLayout>
    </>
  );
}
