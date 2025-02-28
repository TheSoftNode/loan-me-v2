"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useGetUserDetailsQuery } from './queries/authApi';

const LoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-teal-100 max-w-md w-full">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 text-center">Loading your account information...</p>
            </div>
        </div>
    </div>
);

type UserRole = 'user' | 'admin';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const router = useRouter();
    const token = Cookies.get('access_token');
    const { data: userData, isLoading, error } = useGetUserDetailsQuery();

    console.log(userData);

    useEffect(() => {
        if (!token) {
            toast.error('Please sign in to continue');
            router.push('/login');
            return;
        }

        if (!isLoading && !userData) {
            Cookies.remove('access_token');
            // Cookies.remove('refresh_token');
            toast.error('Session expired. Please sign in again');
            router.push('/login');
            return;
        }

        if (userData && allowedRoles && !allowedRoles.includes(userData.role)) {
            toast.error('You do not have permission to access this page');
            router.push('/user-dashboard');
            return;
        }

        // Check email verification
        if (userData && !userData.is_verified) {
            toast.error('Please verify your email to continue');
            router.push(`/verify-email?email=${encodeURIComponent(userData.email)}`);
            return;
        }

    }, [token, userData, isLoading, router, allowedRoles]);

    // Handle API errors
    useEffect(() => {
        if (error) {
            const apiError = error as any;
            if (apiError.status === 401) {
                // Cookies.remove('access_token');
                // Cookies.remove('refresh_token');
                toast.error('Session expired. Please sign in again');
                router.push('/login');
            } else if (apiError.status === 403) {
                toast.error('You do not have permission to access this page');
                router.push('/');
            } else {
                toast.error(apiError.message || 'Something went wrong');
            }
        }
    }, [error, router]);

    if (isLoading) {
        return <LoadingState />;
    }

    // Don't render children if conditions aren't met
    if (!token || !userData || (allowedRoles && !allowedRoles.includes(userData.role))) {
        return null;
    }

    return <>{children}</>;
}
