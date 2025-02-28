"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRequestPasswordResetMutation } from "@/src/service/queries/authApi";

export default function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [requestReset, { isLoading }] = useRequestPasswordResetMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            await toast.promise(
                requestReset({ email }).unwrap(),
                {
                    loading: 'Sending reset instructions...',
                    success: (response) => response.message || "Password reset instructions sent!",
                    error: (error) => error.data?.error || "Failed to send reset instructions"
                }
            );
            setEmail('');
        } catch (error) {
            // Error is handled by toast.promise
            console.error('Reset request error:', error);
        }
    };

    return (
        <div className="min-h-screen lg:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full sm:max-w-2xl lg:max-w-xl xl:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
                    <div className="flex flex-col items-center mb-6">
                        <KeyRound className="h-12 w-12 text-teal-600 mb-4" />
                        <h1 className="text-3xl font-bold text-teal-600 text-center">Reset Password</h1>
                    </div>

                    <Alert className="bg-teal-50 border-teal-100 text-teal-700 mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Enter your email address and we&apos;ll send you instructions to reset your password.
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending Instructions...
                                </>
                            ) : (
                                'Send Reset Instructions'
                            )}
                        </Button>

                        <Link
                            href="/login"
                            className="w-full flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors mt-4"
                        >
                            Back to Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}