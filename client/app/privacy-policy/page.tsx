"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Banknote, CreditCard,
    UserCheck, Bell, ScrollText, ShieldCheck, LockKeyhole
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PrivacyPolicyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');


    const sections = [
        {
            icon: <UserCheck className="h-6 w-6" />,
            title: "Loan Application Data",
            content: [
                "Credit history and score",
                "Income and employment verification",
                "Bank statements and transactions",
                "Government-issued ID documents"
            ]
        },
        {
            icon: <Banknote className="h-6 w-6" />,
            title: "Financial Information",
            content: [
                "Bank account details",
                "Payment history",
                "Asset and liability information",
                "Financial statements"
            ]
        },
        {
            icon: <ShieldCheck className="h-6 w-6" />,
            title: "Data Protection",
            content: [
                "256-bit SSL encryption",
                "Multi-factor authentication",
                "Regular security assessments",
                "Automated threat detection"
            ]
        },
        {
            icon: <LockKeyhole className="h-6 w-6" />,
            title: "Your Data Rights",
            content: [
                "Access loan information",
                "Update personal details",
                "Data portability options",
                "Privacy preferences control"
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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
                        Your Privacy Matters
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        Privacy & Data Protection
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your financial journey is personal. We ensure your data is protected with bank-level security while providing the transparency you deserve.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="max-w-2xl mx-auto mb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search privacy policy..."
                            className="pl-12 pr-4 py-3 w-full text-lg rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Key Points Cards */}
                <motion.div
                    className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <Card className="h-full border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-3 mr-4 text-white">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-3">
                                        {section.content.map((item, idx) => (
                                            <li key={idx} className="text-gray-600 text-base flex items-start">
                                                <div className="h-2 w-2 rounded-full bg-teal-500 mr-3 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Detailed Policy Sections */}
                <motion.div
                    className="max-w-4xl mx-auto space-y-10 text-gray-700"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center">
                            <CreditCard className="h-6 w-6 mr-3 text-teal-600" />
                            Loan Data Processing
                        </h2>
                        <p className="text-base leading-relaxed">
                            We collect and process your financial information solely for the purpose of loan assessment, approval, and servicing. This includes credit checks, income verification, and payment processing. Your data is encrypted and accessed only by authorized personnel.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center">
                            <Bell className="h-6 w-6 mr-3 text-teal-600" />
                            Communication Preferences
                        </h2>
                        <p className="text-base leading-relaxed">
                            We may contact you regarding your loan application, payment reminders, and account updates. You can manage your communication preferences through your account settings, including opting out of marketing communications.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center">
                            <ScrollText className="h-6 w-6 mr-3 text-teal-600" />
                            Data Retention
                        </h2>
                        <p className="text-base leading-relaxed">
                            We retain your personal and financial information for the duration of your loan agreement and a period thereafter as required by law. You can request data deletion after your loan obligations are fulfilled, subject to legal requirements.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-5 text-gray-800">Contact Our Privacy Team</h2>
                        <div className="text-base space-y-4">
                            <p className="flex items-center">
                                <span className="font-medium mr-3 min-w-[80px]">Email:</span>
                                privacy@loanme.com
                            </p>
                            <p className="flex items-center">
                                <span className="font-medium mr-3 min-w-[80px]">Phone:</span>
                                +1 (555) 123-4567
                            </p>
                            <p className="flex items-center">
                                <span className="font-medium mr-3 min-w-[80px]">Hours:</span>
                                Monday - Friday, 9 AM - 6 PM EST
                            </p>
                        </div>
                    </motion.section>

                    <motion.div
                        variants={itemVariants}
                        className="text-center text-base text-gray-500 pt-6"
                    >
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;