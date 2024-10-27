export interface LoanType
{
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

export interface FormDataType
{
    amount: string;
    term: string;
    purpose: string;
    employment: string;
    income: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    creditScore?: string;
}

import { ReactElement } from 'react';

export interface FAQ
{
    id: string;
    question: string;
    answer: string;
}

export interface FAQCategory
{
    id: string;
    name: string;
    icon: ReactElement;
    questions: FAQ[];
}

export interface FeedbackFormData
{
    rating: number;
    category: string;
    comment: string;
}


export interface User
{
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    photoURL?: string | null;
    needsPasswordSetup?: boolean;
    authMethods: string[]; // ['google', 'password', etc.]
    createdAt: Date | string;
    lastLogin: Date | string;
    acceptedTerms?: boolean;
}

export interface UserProfile
{
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string | null;
    needsPasswordSetup: boolean;
    authMethods: string[];
    createdAt: string;
    lastLogin: string;
    acceptedTerms: boolean;
}