
import ProfilePage from '@/components/Profile/ProfilePage'
import { AuthGuard } from '@/src/service/AuthGuard'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <AuthGuard>
            <ProfilePage />
        </AuthGuard>
    )
}

export default page