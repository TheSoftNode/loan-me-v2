"use client"

import React, { useState } from 'react';
import { Mail, Lock, KeyRound, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "../../../components/ui/alert";
import Link from 'next/link';

const ResetPasswordPage: React.FC = () =>
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>
    {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() =>
        {
            setIsLoading(false);
            if (!otpSent) setOtpSent(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-500 to-purple-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>

                    {!otpSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Alert className="bg-white/10 border-white/20 text-cyan-50">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Enter your email address and we&apos;ll send you a code to reset your password.
                                </AlertDescription>
                            </Alert>
                            <div className="space-y-2">
                                <label className="text-cyan-50 text-sm">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                        placeholder="Enter your email"
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-colors flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Send Reset Code'
                                )}
                            </button>
                            <Link
                                href={"/Login"}
                                type="button"
                                className="w-full flex items-center justify-center text-cyan-50 hover:text-white"
                            >
                                Back to Login
                            </Link>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-cyan-50 text-sm">Reset Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                        placeholder="Enter 6-digit code"
                                    />
                                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-cyan-50 text-sm">New Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                        placeholder="Enter new password"
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-colors flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                            <Link
                                type="button"
                                href={"/Login"}
                                className="w-full flex items-center justify-center text-cyan-50 hover:text-white"
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

export default ResetPasswordPage;