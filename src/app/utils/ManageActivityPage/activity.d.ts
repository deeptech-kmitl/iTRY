import { TypeActivity } from "@/app/components/ManageActivityPage/activity";
import { ApiDataList } from "@/app/components/global";
import { ReactNode } from "react";

interface ITryActivity extends ActivityDefaultProps {
  imageUrl: File | Blob | string;
  activityId?: string;
  schedule: ScheduleActivity[];
  facebookLink: string;
  igLink: string;
  applyLink: string;
  faq: FAQActivity[];
  phone: PhoneActivity[];
  email: string;
  jobPositions: JobPositionsActivity[];
}

export interface ActivityApiData extends ApiDataList<ITryActivity> { 
  countActivities: number;
 }

export interface ITryActivityCard extends ActivityDefaultProps {
  imageUrl: string;
  activityId: string;
}

interface ActivityDefaultProps {
  activityName: string;
  openDate: string;
  closeDate: string;
  visibility: "outsider" | "insider" | "all";
  activityDetails: string;
  typeActivity: TypeActivity
}

export interface ScheduleActivity {
  date: string;
  title: string;
  details: string | ReactNode;
}

export interface JobPositionsActivity {
  name: string;
  amount: number;
}

export interface PhoneActivity {
  phone: string;
}

export interface FAQActivity {
  question: string;
  answer: string;
}
