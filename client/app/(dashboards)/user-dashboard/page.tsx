"use client";

import LoanDashboard from '@/components/Dashboard/LoanDashboard'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='mt-16'>
            <LoanDashboard />
        </div>
    )
}

export default page