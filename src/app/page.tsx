"use server";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import RegisteringActivitiesServer from './components/Home/RegisteringActivitiesServer';
import TravelServer from './components/Home/TralvelServer';
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
        <Suspense fallback={<p>Loading Banner...</p>}>
          <BannerServer />
        </Suspense>
        <Suspense fallback={<p>Loading Incoming...</p>}>
          <IncomingServer />
        </Suspense>
        <Suspense fallback={<p>Loading All Activities...</p>}>
          <AllActivitiesServer />
        </Suspense>
        <Suspense fallback={<p>Loading Registering Activities...</p>}>
          <RegisteringActivitiesServer />
        </Suspense>
        <Suspense fallback={<p>Loading Travel...</p>}>
          <TravelServer />
        </Suspense>
        <Suspense fallback={<p>Loading Map...</p>}>
          <Map />
        </Suspense>
        <Suspense fallback={<p>Loading Sponsors...</p>}>
          <SponsorServer />
        </Suspense>
      </UserLayout>
    </>
  );
}
