"use client"

import React, { useState } from 'react';
import { Mail, Lock, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';

const ResetPasswordPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        code: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (!otpSent) setOtpSent(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Reset Password</h2>

                    {!otpSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Alert className="bg-teal-50 border-teal-100 text-teal-700">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Enter your email address and we'll send you a code to reset your password.
                                </AlertDescription>
                            </Alert>
                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="Enter your email"
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                                    'Send Reset Code'
                                )}
                            </button>
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">Reset Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="Enter 6-digit code"
                                    />
                                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                                {errors.code && (
                                    <p className="text-red-500 text-xs mt-1">{errors.code}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="Enter new password"
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                                    'Reset Password'
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

export default ResetPasswordPage;