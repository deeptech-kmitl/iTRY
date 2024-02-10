interface ActivityForm {
  image: File | Blob;
  activityName: string;
  openDate: string;
  closeDate: string;
  visibility: VisibilityActivity;
  activityDetails: string;
  schedule: ScheduleActivity[];
  facebookLink
  igLink
  registerLink
  faq
  phone: PhoneActivity[];
  email: string;
  jobPositions: JobPositionsActivity[];
}

export type VisibilityActivity = {
  name: "บุคคลภายนอก"
  value: "outsider"
} | {
  name: "บุคคลภายใน"
  value: "insider"
} | {
  name: "ทั้งหมด"
  value: "all"
}

export interface ScheduleActivity {
  date: string;
  title: string;
  details: string;
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
