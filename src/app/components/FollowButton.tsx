'use client'

import ITryButton from '../components/Button'
import { useState } from 'react'

export default function FollowButton() {
    const [follow, setFollow] = useState(false)
    const followActivity = () => {
        setFollow(!follow)
    }
    return (
        <>
            <ITryButton fullWidth size='small' customClassName={follow === true ? 'text-white bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600' : ''} onClick={followActivity}>{follow === true ? 'ติดตามแล้ว': 'ติดตาม'}</ITryButton>
        </>
    )
}