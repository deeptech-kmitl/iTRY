"use server"
import { TypeActivityParams } from '@/app/components/ManageActivityPage/activity';
import dynamic from 'next/dynamic';
const AllActivitiesContainer = dynamic(() => import('@/app/components/Home/AllActivitiesContainer'), { ssr: false });
import { getActivitiesDesc } from '@/app/api/sortActivity/[user]/desc/route';
import { ActivityApiData } from '@/app/utils/ManageActivityPage/activity';
import { ApiError } from '@/app/components/global';
import { getRegisteringActivities } from '../api/registeringActivities/route';



interface ActivitiesPageProps {
    params: TypeActivityParams,
    searchParams: { page: string }
}

export default async function RegisteringActivitiesPage({ params, searchParams }: ActivitiesPageProps) {

    const page = parseInt(searchParams?.page || "") || 1;

    const activities = await getRegisteringActivities(1, 5, 'AllRegistering') as ActivityApiData | ApiError | undefined;;
    return (
        <div>
            <h3 className="text-3xl mb-10">กิจกรรมที่กำลังเปิดรับสมัคร</h3>
            <AllActivitiesContainer activitiesData={activities} page={page} showPagination />
        </div>
    )
}