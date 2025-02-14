"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
    Scale, AlertCircle, CheckCircle, Shield,
    ScrollText, UserCheck, FileLock, FileWarning,
    Settings, Mail
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const TermsOfServicePage = () => {
    const keyPoints = [
        {
            icon: <Scale className="h-6 w-6" />,
            title: "Service Terms",
            content: "By accessing our services, you agree to these terms and conditions. Our services are subject to eligibility requirements and applicable laws.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <AlertCircle className="h-6 w-6" />,
            title: "User Responsibilities",
            content: "You must provide accurate information, maintain account security, and use our services in compliance with all applicable laws and regulations.",
            color: "from-cyan-500 to-teal-500"
        },
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Account Terms",
            content: "You must be 18 or older to use our services. Each user is limited to one account unless explicitly authorized otherwise.",
            color: "from-teal-500 to-emerald-500"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Security",
            content: "You are responsible for maintaining the confidentiality of your account credentials and must notify us immediately of any unauthorized access.",
            color: "from-emerald-500 to-green-500"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-teal-600 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        Legal Agreement
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Please read these terms carefully before using our services. These terms establish your rights, obligations, and the conditions for using LoanMe's services.
                    </p>
                </motion.div>

                {/* Key Points Cards */}
                <motion.div
                    className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {keyPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <Card className="h-full border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`bg-gradient-to-r ${point.color} rounded-xl p-3 mr-4 text-white`}>
                                            {point.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800">{point.title}</h2>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{point.content}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Detailed Terms Sections */}
                <motion.div
                    className="max-w-4xl mx-auto space-y-10 text-gray-700"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <ScrollText className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Acceptance of Terms</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing or using LoanMe's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                        </p>
                    </motion.section>

                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <UserCheck className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Eligibility</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Age Requirement", content: "Must be at least 18 years old" },
                                { title: "Residency", content: "Legal resident of the United States" },
                                { title: "Documentation", content: "Valid Social Security number" },
                                { title: "Financial", content: "Active bank account & income source" }
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <FileLock className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Account Security</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                When you create an account with us, you must:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Provide accurate and complete information",
                                    "Maintain the security of your account credentials",
                                    "Update your information promptly if it changes",
                                    "Accept responsibility for all activities under your account"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start text-gray-600"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="h-2 w-2 rounded-full bg-teal-500 mr-3 mt-2" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>

                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <Settings className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Service Modifications</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.
                        </p>
                    </motion.section>

                    <motion.section
                        variants={itemVariants}
                        className="bg-teal-600 rounded-2xl p-8 text-white"
                    >
                        <div className="flex items-center mb-6">
                            <Mail className="h-6 w-6 mr-3" />
                            <h2 className="text-2xl font-semibold">Contact Information</h2>
                        </div>
                        <p className="mb-6 text-white">
                            If you have any questions about these Terms of Service, please reach out to our legal team:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="border border-white/20 rounded-xl p-4 hover:bg-teal-500 transition-colors">
                                <p className="font-medium text-white">Email</p>
                                <p className="text-white mt-1">legal@loanme.com</p>
                            </div>
                            <div className="border border-white/20 rounded-xl p-4 hover:bg-teal-500 transition-colors">
                                <p className="font-medium text-white">Phone</p>
                                <p className="text-white mt-1">+1 (555) 123-4567</p>
                            </div>
                            <div className="border border-white/20 rounded-xl p-4 hover:bg-teal-500 transition-colors">
                                <p className="font-medium text-white">Address</p>
                                <p className="text-white mt-1">123 Finance Street, NY</p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.div
                        variants={itemVariants}
                        className="text-center text-sm text-gray-500 pt-6"
                    >
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;