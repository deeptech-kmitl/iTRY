"use server"
import AllActivitiesContainer from '../components/Home/AllActivitiesContainer';
import useUserController from '../components/Navbar/useUserController';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ActivityApiData } from '@/app/utils/ManageActivityPage/activity';
import UserLayout from '@/app/user/layout';

interface MyActivitiesPagePArops {
  searchParams: { page: string }
}

export default async function MyActivitiesPage({ searchParams }: MyActivitiesPagePArops) {

  const page = parseInt(searchParams.page) || 1
  const session = await getServerSession(authOptions)
  const myActivities = session?.user.activitiesFollow
  const activitiesData = {
    data: myActivities
  } as ActivityApiData
  return (
    <>
      <UserLayout>
        <AllActivitiesContainer showPagination page={page} activitiesData={activitiesData} />
      </UserLayout>
    </>
  )

}