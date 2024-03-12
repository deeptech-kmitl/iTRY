"use client";

import Link from "next/link";
import {
  ITryActivity,
  ITryActivityCard,
} from "../utils/ManageActivityPage/activity";
import Image from "next/image";
import { reduceHtml } from "../utils/reduceHtmlTag";
import { convertDateToThai } from "../utils/convertDateToThai";
import ITryButton from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TypeActivity } from "./ManageActivityPage/activity";
import { deleteStaffActivity } from "../api/crudActivity/staff/route";
import { deleteCamperActivity } from "../api/crudActivity/camper/route";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface CardActivityProps extends ITryActivity {
  canEdit?: boolean;
}

export const CardActivity = ({
  activityId = "",
  activityDetails,
  activityName,
  closeDate,
  imageUrl,
  openDate,
  typeActivity,
  canEdit = false
}: CardActivityProps) => {
  const activityDetailsReduced = activityDetails
    ? reduceHtml(activityDetails, 3) + "<span>...</span>"
    : "ไม่มีรายละเอียดกิจกรรม";

  const router = useRouter()

  const deleteActivity = async () => {
    try {
      Swal.fire({
                text: "คุณต้องการลบกิจกรรมนี้ใช่ไหม?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    typeActivity === "camper" ? await deleteCamperActivity(activityId) : await deleteStaffActivity(activityId)
                    Swal.fire({
                        icon: "success",
                        text: "ลบกิจกรรมสำเร็จ",
                    });
                }

                router.refresh()
            });
    } catch (e) {
      Swal.fire({
                icon: "error",
                text: "ลบกิจกรรมไม่สำเร็จ!",
            });
    }
  }

  return (
    <div className="md:max-h-64 overflow-hidden transform duration-500 bg-slate-900 border-solid rounded-md shadow shadow-neonBlue mb-8 ">
      <div className="flex flex-wrap md:flex-nowrap shadow-lg">
        <Image
          priority
          className="w-full md:max-w-xs	aspect-video object-cover  "
          alt=""
          src={imageUrl as string}
          width={200}
          height={200}
        />
        <div className="card-body w-full">
          <h2 className="card-title text-base md:text-xl lg:text-2xl">
            {activityName}
          </h2>
          <p
            className="text-base text-stone-400 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: activityDetailsReduced }}
          />
          <p className="text-cyan-400 text-xs md:text-sm line-clamp-1">
            รับสมัครวันที่ : {convertDateToThai(openDate)} -{" "}
            {convertDateToThai(closeDate)}
          </p>
          <div className="w-full flex justify-end gap-2">
            {canEdit && (
              <>
                <Link
                  href={`/admin/activity/${typeActivity}/edit/${activityId}`}
                  shallow
                >
                  <ITryButton type="ghost" removeDefaultClassName customClassName="text-cyan-400">
                    แก้ไข
                  </ITryButton>
                </Link>
                <ITryButton type="ghost" onClick={deleteActivity} removeDefaultClassName customClassName="text-cyan-400">
                  ลบ
                </ITryButton>
              </>
            )}
            <Link
              href={`/${typeActivity}/activity-details/${activityId}`}
              shallow
            >
              <ITryButton type="ghost" removeDefaultClassName customClassName="text-cyan-400">
                Read More
                <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
              </ITryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
