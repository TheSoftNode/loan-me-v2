import React from 'react';
import { ArrowRight, ChevronRight, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () =>
{
    const benefits = [
        "Decision in under 3 minutes",
        "Tailored rates based on your profile",
        "Zero hidden fees"
    ];

    return (
        <section className="relative pt-20 sm:pt-12 lg:pt-16 min-h-[500px] lg:min-h-[500px] flex justify-center items-center pb-6 sm:pb-8 lg:pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Rest of the code remains exactly the same... */}
            <div className="absolute hidden sm:block inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/3 right-1/3 w-36 sm:w-48 lg:w-64 h-36 sm:h-48 lg:h-64 bg-teal-600/10 rounded-full blur-[80px] animate-pulse delay-500" />
            </div>

            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-4 flex justify-center items-center flex-col sm:space-y-6 lg:space-y-8">
                        {/* Trustpilot Banner */}
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-full py-2 px-4 animate-fade-in shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs sm:text-sm text-gray-600">Trusted by over 150,000 customers</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>

                        {/* Main Content */}
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight animate-fade-in">
                                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                                    Smart Financing
                                </span>
                                <span className="text-gray-900 ml-2">For Your Future</span>
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl animate-fade-in">
                                Access intelligent lending solutions with competitive rates, AI-powered approvals, and funds delivered to your account in as little as 24 hours.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 animate-fade-in">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-2 group">
                                    <CheckCircle className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in pt-2">
                            <Link href="/Dashboard" className="w-full sm:w-auto">
                                <button className="group bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold inline-flex items-center justify-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                                    Start Your Application
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <div className="text-xs sm:text-sm text-gray-500 flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Soft credit check only</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Elements */}
                    <div className="relative hidden lg:block h-[500px] xl:h-[600px]">
                        <div className="relative animate-float">
                            {/* Main Card */}
                            <div className="absolute top-40 right-0 w-72 xl:w-80 h-80 xl:h-96 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-3xl shadow-2xl transform rotate-6 transition-transform hover:rotate-8 duration-300" />
                            <div className="absolute top-40 right-0 w-72 xl:w-80 h-80 xl:h-96 bg-white rounded-3xl shadow-xl p-6 xl:p-8 transition-transform hover:-translate-y-2 duration-300">
                                <div className="h-full flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="w-12 xl:w-16 h-12 xl:h-16 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl transform transition-transform hover:scale-105 duration-300" />
                                        <div className="space-y-3">
                                            <div className="h-3 w-3/4 bg-gray-200 rounded-full animate-pulse" />
                                            <div className="h-3 w-1/2 bg-gray-200 rounded-full animate-pulse delay-75" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="space-y-2">
                                                <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                                                <div className="h-6 w-32 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full" />
                                            </div>
                                            <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -bottom-48 -left-8 bg-white rounded-2xl shadow-lg p-4 xl:p-6 transform -rotate-6 animate-float delay-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-3 xl:space-x-4">
                                    <div className="w-10 xl:w-12 h-10 xl:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                                        <CheckCircle className="h-5 xl:h-6 w-5 xl:w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm xl:text-base text-gray-900">Pre-Qualified</div>
                                        <div className="text-xs xl:text-sm text-gray-500">Just now</div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Card */}
                            <div className="absolute -right-8 top-20 bg-white rounded-2xl shadow-lg p-4 xl:p-6 w-56 xl:w-64 transform rotate-6 animate-float delay-200 hover:shadow-xl transition-all duration-300">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs xl:text-sm text-gray-600">Application Progress</span>
                                        <span className="text-cyan-600 font-bold text-xs xl:text-sm">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-cyan-600 to-teal-600 h-2 rounded-full transition-all duration-1000 animate-pulse"
                                            style={{ width: '85%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;