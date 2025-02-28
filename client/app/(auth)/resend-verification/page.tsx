"use client"

import React, { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResendVerificationMutation } from '@/src/service/queries/authApi';
import toast from 'react-hot-toast';

const ResendVerificationPage: React.FC = () => {
    const router = useRouter();
    const [resendVerification, { isLoading }] = useResendVerificationMutation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const loadingToast = toast.loading('Sending verification code...');

            await resendVerification({ email }).unwrap();

            toast.dismiss(loadingToast);
            toast.success('Verification code sent successfully!');

            // Save email and redirect to verification page
            localStorage.setItem('userEmail', email);
            router.push('/verify-email');

        } catch (error: any) {
            const errorMessage = error?.data?.error || 'Failed to send verification code';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Resend Verification</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Alert className="bg-teal-50 border-teal-100 text-teal-700">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Enter your email address to receive a new verification code.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Enter your email"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mt-1">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Send Verification Code'
                            )}
                        </button>

                        <Link
                            href="/login"
                            className="w-full flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors"
                        >
                            Back to Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResendVerificationPage;