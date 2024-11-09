"use client"

import React, { useState, FormEvent } from 'react';
import { User, Mail, Lock, Check, X, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormErrors
{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface PasswordStrength
{
    score: number;
    requirements: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

const RegisterPage = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
        score: 0,
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });
    const router = useRouter();

    const validateEmail = (email: string) =>
    {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const checkPasswordStrength = (password: string) =>
    {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        setPasswordStrength({ score, requirements });
        return score;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: inputValue
        }));

        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));

        if (name === 'password')
        {
            checkPasswordStrength(value);
        }

        if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword))
        {
            if (name === 'confirmPassword' && value !== formData.password)
            {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'Passwords do not match'
                }));
            } else if (name === 'password' && value !== formData.confirmPassword)
            {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'Passwords do not match'
                }));
            } else
            {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: undefined
                }));
            }
        }
    };

    const validateForm = () =>
    {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim())
        {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim())
        {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim())
        {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email))
        {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password)
        {
            newErrors.password = 'Password is required';
        } else if (passwordStrength.score < 5)
        {
            newErrors.password = 'Password does not meet all requirements';
        }
        if (formData.password !== formData.confirmPassword)
        {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) =>
    {
        e.preventDefault();

        if (!validateForm())
        {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);

        try
        {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    acceptedTerms: formData.termsAccepted,
                }),
            });

            const data = await response.json();

            if (!response.ok)
            {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Account created successfully! Redirecting to login...', {
                duration: 4000,
            });

            setTimeout(() =>
            {
                router.push('/Login');
            }, 2000);

        } catch (error)
        {
            toast.error(error instanceof Error ? error.message : 'Failed to create account');
        } finally
        {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () =>
    {
        // Only return green if all requirements are met
        if (passwordStrength.score === 5)
        {
            return 'bg-green-500';
        }
        // Return different colors based on progress
        const colors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-yellow-500'];
        return colors[passwordStrength.score] || colors[0];
    };

    return (
        <div className="min-h-screen lg:py-20  bg-gradient-to-br  from-cyan-50 via-teal-50 to-emerald-50  flex items-center justify-center p-4">
            <Toaster />
            <div className="w-full sm:max-w-2xl lg:max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">First Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="John"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-600 text-sm font-medium">Last Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        placeholder="Doe"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                </div>
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email field remains the same */}
                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="john.doe@example.com"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password field with visibility toggle */}
                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Create a strong password"
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

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="space-y-2">
                                    <div className="flex space-x-1 h-1">
                                        {[...Array(5)].map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-full w-full rounded-full ${index < passwordStrength.score
                                                    ? getPasswordStrengthColor()
                                                    : 'bg-slate-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {Object.entries(passwordStrength.requirements).map(([key, met]) => (
                                            <div
                                                key={key}
                                                className={`flex items-center space-x-1 ${met ? 'text-green-500' : 'text-slate-400'
                                                    }`}
                                            >
                                                {met ? (
                                                    <Check className="h-3 w-3" />
                                                ) : (
                                                    <X className="h-3 w-3" />
                                                )}
                                                <span>
                                                    {key === 'length'
                                                        ? '8+ characters'
                                                        : key === 'uppercase'
                                                            ? 'Uppercase'
                                                            : key === 'lowercase'
                                                                ? 'Lowercase'
                                                                : key === 'number'
                                                                    ? 'Number'
                                                                    : 'Special char'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password field with visibility toggle */}
                        <div className="space-y-2">
                            <label className="text-slate-600 text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    placeholder="Confirm your password"
                                />
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start space-x-2 text-sm">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleInputChange}
                                className="mt-1 rounded border-slate-300 !text-teal-500 focus:!ring-teal-400"
                            />
                            <label className="text-slate-600">
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Login Link */}
                        <Link
                            href="/login"
                            className="w-full flex items-center justify-center text-slate-600 hover:text-cyan-500 transition-colors"
                        >
                            Already have an account?
                            <span className='text-cyan-500 ml-1'>Sign in</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;