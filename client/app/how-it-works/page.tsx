"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
    ClipboardCheck, Calculator,
    BadgeCheck, CreditCard, CheckCircle2,
    ArrowRight, Rocket, Shield, Banknote
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowItWorksPage = () => {
    const steps = [
        {
            icon: <ClipboardCheck className="h-6 w-6" />,
            title: "Complete Application",
            description: "Fill out our simple online application form with your basic information and loan requirements.",
            color: "from-blue-500 to-cyan-500",
            details: ["Personal information", "Employment details", "Income verification", "Loan amount needed"]
        },
        {
            icon: <Calculator className="h-6 w-6" />,
            title: "Instant Assessment",
            description: "Our AI-powered system evaluates your application instantly using multiple criteria.",
            color: "from-cyan-500 to-teal-500",
            details: ["Credit score check", "Income validation", "Risk assessment", "Loan eligibility"]
        },
        {
            icon: <BadgeCheck className="h-6 w-6" />,
            title: "Loan Approval",
            description: "Receive your loan offer with transparent terms and competitive rates.",
            color: "from-teal-500 to-emerald-500",
            details: ["Loan amount", "Interest rate", "Repayment terms", "Total cost breakdown"]
        },
        {
            icon: <Banknote className="h-6 w-6" />,
            title: "Quick Disbursement",
            description: "Get funds deposited directly to your bank account within 24 hours of approval.",
            color: "from-emerald-500 to-green-500",
            details: ["Bank verification", "Direct deposit", "Transfer confirmation", "Usage flexibility"]
        }
    ];

    const benefits = [
        {
            icon: <Rocket className="h-6 w-6 text-purple-500" />,
            title: "Fast Processing",
            description: "Get your loan approved and disbursed within 24 hours"
        },
        {
            icon: <Shield className="h-6 w-6 text-blue-500" />,
            title: "Secure Process",
            description: "Bank-grade encryption to protect your sensitive information"
        },
        {
            icon: <CreditCard className="h-6 w-6 text-green-500" />,
            title: "Flexible Terms",
            description: "Customize your loan amount and repayment schedule"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-6 py-20">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-teal-600 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        Simple Process
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        How It Works
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Get your loan in four simple steps. Our streamlined process makes borrowing quick, easy, and transparent.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <motion.div
                    className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <Card className="h-full border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`bg-gradient-to-r ${step.color} rounded-xl p-3 mr-4 text-white`}>
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl font-bold text-gray-300">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 mb-6">{step.description}</p>
                                    <ul className="space-y-3">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center text-gray-600">
                                                <CheckCircle2 className="h-4 w-4 mr-2 text-teal-500" />
                                                <span className="text-sm">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            {index < steps.length - 1 && (
                                <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                    <ArrowRight className="h-6 w-6 text-teal-500" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                    className="max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Process?</h2>
                        <p className="text-lg text-gray-600">Experience the benefits of our modern lending platform</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-gray-50 rounded-xl p-3 mr-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                                </div>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-10 md:p-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who have successfully secured their loans through our platform.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                className="bg-white text-teal-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl"
                                onClick={() => window.location.href = '/apply'}
                            >
                                Apply Now
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                                onClick={() => window.location.href = '/contact'}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorksPage;