"use client"

import React, { useState, useEffect } from 'react';
import { Mail, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyEmailMutation, useResendVerificationMutation } from '@/src/service/queries/authApi';
import toast from 'react-hot-toast';

const VerifyEmailPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromParams = searchParams.get('email');

    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    const [isResendMode, setIsResendMode] = useState(false);
    const [resendEmail, setResendEmail] = useState(emailFromParams || '');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!emailFromParams && !isResendMode) {
            toast.error('Email not found');
            router.push('/signup');
        }
    }, [emailFromParams, router, isResendMode]);

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!code || code.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }

        if (!emailFromParams) {
            toast.error('Email not found');
            return;
        }

        try {
            const loadingToast = toast.loading('Verifying your email...');

            await verifyEmail({
                email: emailFromParams,
                code: code
            }).unwrap();

            toast.dismiss(loadingToast);
            toast.success('Email verified successfully!');

            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error: any) {
            const errorMessage = error?.data?.error || 'Failed to verify email';
            toast.error(errorMessage);
        }
    };

    const handleResendCode = async () => {
        if (!resendEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resendEmail)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            const loadingToast = toast.loading('Sending verification code...');

            await resendVerification({
                email: resendEmail
            }).unwrap();

            toast.dismiss(loadingToast);
            toast.success('Verification code sent! Please check your email.', {
                icon: '📧',
                duration: 5000
            });

            // Reset states and update URL with new email
            router.push(`/verify-email?email=${encodeURIComponent(resendEmail)}`);
            setIsResendMode(false);
            setCode('');

        } catch (error: any) {
            const errorMessage = error?.data?.error || 'Failed to send verification code';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
                        {isResendMode ? 'Resend Verification Code' : 'Verify Your Email'}
                    </h2>

                    {isResendMode ? (
                        <div className="space-y-4">
                            <Alert className="bg-teal-50 border-teal-100 text-teal-700">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Enter your email address to receive a new verification code.
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={resendEmail}
                                        onChange={(e) => setResendEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="Enter your email"
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
                                    disabled={isResending}
                                >
                                    {isResending ? (
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        'Send Verification Code'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsResendMode(false)}
                                    className="w-full text-slate-600 hover:text-teal-600 transition-colors"
                                >
                                    Back to Verification
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleVerify} className="space-y-4">
                            <Alert className="bg-teal-50 border-teal-100 text-teal-700">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Please enter the 6-digit code sent to <span className="font-medium">{emailFromParams}</span>
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">Verification Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            setCode(value);
                                            setError('');
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-center tracking-widest"
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                    />
                                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                                {error && (
                                    <p className="text-red-500 text-xs mt-1">{error}</p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsResendMode(true)}
                                className="w-full flex items-center justify-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors py-2"
                            >
                                <RefreshCw className="h-4 w-4" />
                                <span>Didn&apos;t receive a code?</span>
                            </button>

                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
                                disabled={isVerifying}
                            >
                                {isVerifying ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Verify Email'
                                )}
                            </button>

                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;