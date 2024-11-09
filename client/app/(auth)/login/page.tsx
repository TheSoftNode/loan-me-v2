"use client"

import React, { useState, FormEvent } from 'react';
import { ArrowRight, Mail, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { PasswordSetupModal } from '@/components/Password/PasswordSetupModal';

interface LoginFormData
{
    email: string;
    password: string;
    rememberMe: boolean;
}

interface FormErrors
{
    email?: string;
    password?: string;
}

const LoginPage: React.FC = () =>
{
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [showPasswordSetup, setShowPasswordSetup] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateEmail = (email: string) =>
    {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) =>
    {
        return password.length >= 6;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: inputValue
        }));

        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));
    };

    const validateForm = () =>
    {
        const newErrors: FormErrors = {};

        if (!formData.email)
        {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email))
        {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password)
        {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password))
        {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <Toaster />
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Welcome Back</h2>

                    <form className="space-y-4">
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

                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Enter your password"
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
                            type="button"
                            className="w-full md:hidden bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 text-teal-700 flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors"

                        >
                            <Fingerprint className="h-5 w-5" />
                            Use Passwordless Login
                        </button>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="mr-2 rounded border-slate-300 text-teal-500 focus:ring-teal-400"
                                />
                                Remember me
                            </label>
                            <Link
                                href="/ResetPassword"
                                className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-slate-500 bg-white">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button
                                type="button"

                                className="flex items-center justify-center py-2 px-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors gap-2"
                                disabled={isGoogleLoading}
                            >
                                {isGoogleLoading ? (
                                    <div className="h-5 w-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FaGoogle className="h-5 w-5 text-teal-600" />
                                        <span className="text-slate-600">Continue with Google</span>
                                    </>
                                )}
                            </button>

                            <PasswordSetupModal
                                isOpen={showPasswordSetup}
                                onClose={() => setShowPasswordSetup(false)}
                                onSuccess={() =>
                                {
                                    toast.success('Password setup successful!');
                                    router.push('/Dashboard');
                                }}
                            />
                        </div>

                        <Link
                            href="/signup"
                            className="w-full flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors mt-4"
                        >
                            Don&apos;t have an account?
                            <span className="text-teal-500 ml-1">Sign up</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;