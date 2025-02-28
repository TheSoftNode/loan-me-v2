"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/src/service/queries/authApi";

export default function PasswordReset() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    // Redirect if no token or email
    if (!token || !email) {
        toast.error("Invalid reset link");
        router.push('/request-password-reset');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await toast.promise(
                resetPassword({
                    email,
                    token,
                    new_password: formData.password
                }).unwrap(),
                {
                    loading: 'Updating password...',
                    success: (response) => {
                        setTimeout(() => {
                            router.push('/login');
                        }, 2000);
                        return response.message || "Password updated successfully! Redirecting to login...";
                    },
                    error: (error) => error.data?.error || "Failed to update password"
                }
            );
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <div className="flex flex-col items-center mb-6">
                        <KeyRound className="h-12 w-12 text-teal-600 mb-4" />
                        <h1 className="text-3xl font-bold text-teal-600 text-center">Create New Password</h1>
                    </div>

                    <Alert className="bg-teal-50 border-teal-100 text-teal-700 mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Please enter your new password below. Make sure it&apos;s at least 8 characters long.
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">New Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Updating Password...
                                </>
                            ) : (
                                'Update Password'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}