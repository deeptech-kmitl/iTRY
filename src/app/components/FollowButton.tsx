'use client'

import ITryButton from '../components/Button'
import { useState } from 'react'

export default function FollowButton() {
    const [follow, setFollow] = useState(false)
    return (
        <>
            <ITryButton fullWidth size='small' customClassName='bg-linear-gray'>ติดตาม</ITryButton>
        </>
    )
}