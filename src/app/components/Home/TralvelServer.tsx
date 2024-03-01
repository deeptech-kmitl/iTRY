"use server";
import dynamic from "next/dynamic";
const TravelContainer = dynamic(() => import("./TravelContainer"), {
  ssr: false,
});
import { getTravel } from "@/app/api/travel/route";
import {
  ActivityApiData,
  ITryActivity,
} from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CardRoutes from "../CardRoute";

export default async function TravelServer() {
  const result = (await getTravel()) as any;
  // console.log("result----", result);

  return (
    <>
      <div className="text-center py-12 md:py-16">
        <h1 className="text-base md:text-2xl">
          การเดินทางมาคณะเทคโนโลยีสารสนเทศ
        </h1>
        <TravelContainer route={result} />
      </div>
    </>
  );
}
