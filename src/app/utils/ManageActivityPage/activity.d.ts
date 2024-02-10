interface ITryActivity {
  imageUrl: File | Blob | string;
  activityId?: string;
  activityName: string;
  openDate: string;
  closeDate: string;
  visibility: "outsider" | "insider" | "all";
  activityDetails: string;
  schedule: ScheduleActivity[];
  facebookLink: string;
  igLink: string;
  applyLink: string;
  faq: FAQActivity[];
  phone: PhoneActivity[];
  email: string;
  jobPositions: JobPositionsActivity[];
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
