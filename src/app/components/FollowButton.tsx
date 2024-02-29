'use client'

import ITryButton from '../components/Button'
import { ITryActivity } from '../utils/ManageActivityPage/activity'
import { updateFollowActivity } from '../api/followActivity/route'
import ITryToastNotification from './Toast/ToastNotification'
import useUserController from './Navbar/useUserController'

interface FollowButtonProps {
    activity: ITryActivity,
}

export default function FollowButton({ activity }: FollowButtonProps) {


    const { userData, update, session, isLogin } = useUserController()
    const userActivitiesFollow = userData.activitiesFollow
    const isFollowed = userActivitiesFollow.some(followActivit => followActivit.activityId === activity.activityId)

    const followActivity = async () => {
        try {
            const newActivitiesFollow = [...userActivitiesFollow, activity]
            await updateFollowActivity(userData.id, userData.email, newActivitiesFollow)

            await ITryToastNotification({
                type: "success",
                text: "ติดตามกิจกรรมสำเร็จแล้ว"
            })

        } catch (error) {
            await ITryToastNotification({
                type: "error",
                text: "ติดตามกิจกรรมล้มเหลว"
            })
            console.log("error", error)
        }
    }

    const unFollowActivityy = async () => {
        try {
            const newActivitiesFollow = userActivitiesFollow.filter(activityFollow => activityFollow.activityId !== activity.activityId)
            await updateFollowActivity(userData.id, userData.email, newActivitiesFollow)

            await ITryToastNotification({
                type: "success",
                text: "เลิกติดตามกิจกรรมสำเร็จแล้ว"
            })

            update({
                ...session,
                user: {
                    ...userData,
                    activitiesFollow: newActivitiesFollow
                }
            })

            // console.log("result", result)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <>
            {isLogin ? (
                <>
                    <ITryButton fullWidth size='default' customClassName={isFollowed ? 'text-white bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600' : ''} onClick={isFollowed ? unFollowActivityy : followActivity}>{isFollowed ? 'เลิกติดตาม' : 'ติดตาม'}</ITryButton>
                </>
            ) : (
                    <ITryButton fullWidth size='default' removeDefaultClassName disabled>กรุณาเข้าสู่ระบบเพื่อกดติดตาม</ITryButton>
            )}
        </>
    )
}