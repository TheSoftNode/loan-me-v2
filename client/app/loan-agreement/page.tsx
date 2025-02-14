"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign, Calendar, Percent, FileText, Download,
    CheckCircle2, AlertCircle, Lock, ClipboardCheck, Shield
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoanAgreementPage = () => {
    const [showAcceptanceAlert, setShowAcceptanceAlert] = useState(false);

    const keyTerms = [
        {
            icon: <DollarSign className="h-6 w-6" />,
            title: "Loan Amount",
            content: "The principal amount borrowed, as specified in your loan application and approval documents.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Percent className="h-6 w-6" />,
            title: "Interest Rate",
            content: "The annual percentage rate (APR) applied to your loan, including all applicable fees and charges.",
            color: "from-cyan-500 to-teal-500"
        },
        {
            icon: <Calendar className="h-6 w-6" />,
            title: "Repayment Terms",
            content: "The schedule and method of repayment, including payment amounts, due dates, and term length.",
            color: "from-teal-500 to-emerald-500"
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Default Terms",
            content: "Conditions that constitute default and the consequences of defaulting on your loan obligations.",
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
                        Legal Document
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        Loan Agreement
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        This document outlines the terms and conditions of your loan. Please review all sections carefully before accepting the agreement.
                    </p>
                </motion.div>

                {/* Key Terms */}
                <motion.div
                    className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {keyTerms.map((term, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <Card className="h-full border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`bg-gradient-to-r ${term.color} rounded-xl p-3 mr-4 text-white`}>
                                            {term.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800">{term.title}</h2>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{term.content}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Agreement Sections */}
                <motion.div
                    className="max-w-4xl mx-auto space-y-10 text-gray-700"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Definitions Section */}
                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <ClipboardCheck className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Definitions</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "\"Lender\" refers to LoanMe, its successors and assigns",
                                "\"Borrower\" refers to the individual or entity receiving the loan",
                                "\"Loan\" refers to the principal amount borrowed plus any accrued interest",
                                "\"Payment Date\" refers to the scheduled date for loan repayment installments"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start text-gray-600"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="h-2 w-2 rounded-full bg-teal-500 mr-3 mt-2.5" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Loan Terms Section */}
                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <Lock className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Loan Terms</h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "Principal Amount",
                                    content: "The principal amount of the loan shall be as specified in the loan approval documentation."
                                },
                                {
                                    title: "Interest Rate",
                                    content: "Interest shall accrue on the principal amount at the rate specified in the loan approval documentation."
                                },
                                {
                                    title: "Repayment Schedule",
                                    content: "The Borrower agrees to repay the loan in regular installments as specified in the repayment schedule."
                                }
                            ].map((item, index) => (
                                <div key={index} className="pl-4 border-l-2 border-teal-500">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Fees Section */}
                    <motion.section
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-6">
                            <AlertCircle className="h-6 w-6 mr-3 text-teal-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Fees and Charges</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Origination Fee", content: "Up to 5% of the loan amount" },
                                { title: "Late Payment Fee", content: "$35 or 5% of the missed payment" },
                                { title: "Returned Payment", content: "$25 per occurrence" },
                                { title: "Early Repayment", content: "No penalty for early repayment" }
                            ].map((fee, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-medium text-gray-800 mb-1">{fee.title}</h3>
                                    <p className="text-gray-600 text-sm">{fee.content}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Agreement Acceptance */}
                    <motion.section
                        variants={itemVariants}
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-8 text-white mt-12"
                    >
                        <div className="flex items-center mb-6">
                            <Shield className="h-6 w-6 mr-3" />
                            <h2 className="text-2xl font-semibold">Agreement Acceptance</h2>
                        </div>
                        <p className="mb-8 text-white/90">
                            By accepting this agreement, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions outlined in this Loan Agreement.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                            <Button
                                variant="outline"
                                className="bg-white text-teal-600 hover:bg-white/90"
                                onClick={() => window.print()}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                            <Button
                                className="bg-white text-teal-600 hover:bg-white/90"
                                onClick={() => setShowAcceptanceAlert(true)}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Accept Agreement
                            </Button>
                        </div>
                    </motion.section>

                    {showAcceptanceAlert && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Alert className="bg-green-50 text-green-800 border-green-200">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertDescription>
                                    Agreement accepted successfully! A copy has been sent to your email.
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default LoanAgreementPage;