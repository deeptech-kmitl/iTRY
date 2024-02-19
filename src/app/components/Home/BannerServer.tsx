"use server"

import { getBanner } from "@/app/api/banner/route";
import BannerContainer from './BannerContainer';

export default async function BannerServer() {
  const banners = await getBanner();
  return (
    <BannerContainer />
  )
}