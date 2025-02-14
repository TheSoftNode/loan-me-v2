"use client"

import LoanApplication from '@/components/LoanApplication/LoanApplication';
import React from 'react';

export interface LoanType {
    id: string;
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    minTerm: number;
    maxTerm: number;
    baseRate: number;
    requirements: string[];
    features: string[];
}

// Define a proper type for the application data
export interface LoanApplicationData {
    loanTypeId: string;
    amount: number;
    term: number;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
    };
    employmentInfo: {
        employerName: string;
        monthlyIncome: number;
        employmentDuration: number;
    };
    documents: {
        proofOfIncome: boolean;
        identityDocument: boolean;
        additionalDocuments?: string[];
    };
}

type LoanApplicationProps = {
    loanTypes: LoanType[];
    onSubmit: (applicationData: LoanApplicationData) => void;
};

// Mock data for LoanType
const LoanData: LoanApplicationProps = {
    loanTypes: [
        {
            id: 'personal',
            name: 'Personal Loan',
            description: 'Flexible financing for your personal needs',
            minAmount: 1000,
            maxAmount: 50000,
            minTerm: 12,
            maxTerm: 60,
            baseRate: 5.5,
            requirements: [
                'Proof of income',
                'Credit score check',
                'Valid ID',
                'Bank statements'
            ],
            features: [
                'Fixed interest rate',
                'No early repayment fee',
                'Quick approval process',
                'Flexible use of funds'
            ],
        },
        {
            id: 'business',
            name: 'Business Loan',
            description: 'Empower your business growth',
            minAmount: 5000,
            maxAmount: 500000,
            minTerm: 24,
            maxTerm: 120,
            baseRate: 4.5,
            requirements: [
                'Business plan',
                'Financial statements',
                'Tax returns',
                'Business registration'
            ],
            features: [
                'Competitive rates',
                'Flexible repayment terms',
                'Line of credit option',
                'Business advisory support'
            ],
        },
        {
            id: 'education',
            name: 'Education Loan',
            description: 'Invest in your academic future',
            minAmount: 3000,
            maxAmount: 100000,
            minTerm: 36,
            maxTerm: 180,
            baseRate: 3.5,
            requirements: [
                'Admission letter',
                'Academic records',
                'Co-signer details',
                'Institution details'
            ],
            features: [
                'Lower interest rates',
                'Extended repayment period',
                'Grace period options',
                'Study abroad coverage'
            ],
        }
    ],
    onSubmit: (applicationData: LoanApplicationData) => {
        console.log("Application Submitted:", applicationData);
        // Additional processing logic can be added here
    },
};

function Page(): React.ReactElement {
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <LoanApplication {...LoanData} />
        </div>
    );
}

export default Page;