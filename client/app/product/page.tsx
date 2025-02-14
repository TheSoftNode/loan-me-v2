"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DollarSign, Calendar, Percent, Shield,
    Check, ArrowRight, Calculator, BadgeCheck,
    Clock, Target, AlertCircle, X, Info,
    CreditCard, Banknote, GraduationCap, ArrowUp,
    ChevronRight, HelpCircle, BarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ProductPage = () => {
    const [loanAmount, setLoanAmount] = useState(10000);
    const [loanTerm, setLoanTerm] = useState(24);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [showCalculator, setShowCalculator] = useState(false);

    const products = [
        {
            id: 'personal',
            name: 'Personal Loan',
            description: 'Flexible loans for your personal needs',
            minAmount: 1000,
            maxAmount: 50000,
            rate: '8.99%',
            color: "from-blue-500 to-cyan-500",
            icon: <CreditCard className="h-6 w-6" />,
            features: [
                'Fast approval process',
                'No collateral required',
                'Flexible repayment terms',
                'Competitive interest rates'
            ],
            requirements: [
                'Minimum credit score of 650',
                'Proof of steady income',
                'Valid ID and address proof',
                'Bank statements'
            ]
        },
        {
            id: 'business',
            name: 'Business Loan',
            description: 'Grow your business with our financing',
            minAmount: 5000,
            maxAmount: 100000,
            rate: '7.99%',
            color: "from-teal-500 to-emerald-500",
            icon: <Banknote className="h-6 w-6" />,
            features: [
                'Higher loan limits',
                'Tailored repayment plans',
                'Business-specific terms',
                'Expert consultation included'
            ],
            requirements: [
                'Business registration documents',
                'Last 2 years tax returns',
                'Business plan',
                'Financial statements'
            ]
        },
        {
            id: 'education',
            name: 'Education Loan',
            description: 'Invest in your future with education financing',
            minAmount: 3000,
            maxAmount: 75000,
            rate: '6.99%',
            color: "from-purple-500 to-indigo-500",
            icon: <GraduationCap className="h-6 w-6" />,
            features: [
                'Lower interest rates',
                'Extended repayment period',
                'Grace period options',
                'No early repayment fees'
            ],
            requirements: [
                'College acceptance letter',
                'Academic records',
                'Co-signer details',
                'Estimated cost of education'
            ]
        }
    ];

    const calculateMonthlyPayment = (amount: number, months: number, rate: number) => {
        const monthlyRate = rate / 1200;
        const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        return payment.toFixed(2);
    };

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

    const selectedProductData = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

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
                        Our Products
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        Find Your Perfect Loan
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our range of loan products designed to meet your specific needs with competitive rates and flexible terms.
                    </p>
                </motion.div>

                {/* Loan Calculator Dialog */}
                <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
                    <DialogTrigger asChild>
                        <Button
                            className="mx-auto mb-12 flex items-center bg-white text-teal-600 border border-teal-200 hover:bg-teal-50"
                            size="lg"
                        >
                            <Calculator className="mr-2 h-5 w-5" />
                            Open Loan Calculator
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center text-2xl">
                                <BarChart className="mr-2 h-6 w-6 text-teal-600" />
                                Loan Calculator
                            </DialogTitle>
                            <DialogDescription>
                                Estimate your monthly payments and total cost of borrowing
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-8 pt-4">
                            <div className="space-y-8">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Loan Amount
                                        </label>
                                        <span className="text-lg font-semibold text-teal-600">
                                            ${loanAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[loanAmount]}
                                        onValueChange={(value) => setLoanAmount(value[0])}
                                        max={100000}
                                        step={1000}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Loan Term
                                        </label>
                                        <span className="text-lg font-semibold text-teal-600">
                                            {loanTerm} months
                                        </span>
                                    </div>
                                    <Slider
                                        value={[loanTerm]}
                                        onValueChange={(value) => setLoanTerm(value[0])}
                                        min={12}
                                        max={60}
                                        step={12}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Monthly Payment:</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="flex items-center">
                                                        <span className="text-2xl font-bold text-teal-600">
                                                            ${calculateMonthlyPayment(loanAmount, loanTerm, 8.99)}
                                                        </span>
                                                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Estimated payment based on current rates</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Interest:</span>
                                        <span className="text-gray-800 font-semibold">
                                            ${(parseFloat(calculateMonthlyPayment(loanAmount, loanTerm, 8.99)) * loanTerm - loanAmount).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Product Cards */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className={`relative ${selectedProduct === product.id ? 'ring-2 ring-teal-500' : ''}`}
                        >
                            <Card className="h-full border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                                <CardHeader>
                                    <div className={`bg-gradient-to-r ${product.color} text-white p-4 rounded-xl inline-block mb-4`}>
                                        {product.icon}
                                    </div>
                                    <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                                    <CardDescription>{product.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-6">
                                        <div className="flex items-center mb-2">
                                            <span className="text-3xl font-bold text-gray-800">
                                                {product.rate}
                                            </span>
                                            <span className="text-lg text-gray-600 ml-1">APR</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <AlertCircle className="h-4 w-4 ml-2 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Rate may vary based on credit score and term</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
                                        </p>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                                        onClick={() => setSelectedProduct(product.id)}
                                    >
                                        Select Plan
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Selected Product Details Modal */}
                <AnimatePresence>
                    {selectedProduct && (
                        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
                            <DialogContent className="sm:max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center text-2xl">
                                        {selectedProductData?.icon}
                                        <span className="ml-2">{selectedProductData?.name}</span>
                                    </DialogTitle>
                                    <DialogDescription>
                                        Complete details and requirements
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid md:grid-cols-2 gap-6 pt-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-4">Features</h3>
                                        <ul className="space-y-3">
                                            {selectedProductData?.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-4">Requirements</h3>
                                        <ul className="space-y-3">
                                            {selectedProductData?.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                                                    <span className="text-gray-600">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedProduct(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                                        onClick={() => window.location.href = '/apply'}
                                    >
                                        Apply Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </AnimatePresence>

                {/* Benefits Section */}
                <motion.div
                    className="grid md:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        {
                            icon: <Calculator className="h-6 w-6 text-blue-500" />,
                            title: "Easy Application",
                            description: "Simple online process with quick decisions"
                        },
                        {
                            icon: <Clock className="h-6 w-6 text-green-500" />,
                            title: "Fast Funding",
                            description: "Get funds within 24 hours of approval"
                        },
                        {
                            icon: <Shield className="h-6 w-6 text-purple-500" />,
                            title: "Secure Process",
                            description: "Bank-level security for your data"
                        },
                        {
                            icon: <Target className="h-6 w-6 text-red-500" />,
                            title: "Competitive Rates",
                            description: "Market-leading interest rates"
                        }
                    ].map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white rounded-xl p-6 border border-gray-100"
                        >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="bg-gray-50 rounded-lg p-3 inline-block mb-4">
                                            {benefit.icon}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to learn more about {benefit.title.toLowerCase()}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* FAQ Section with Tooltip */}
                <motion.div
                    className="max-w-3xl mx-auto mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                            Common Questions
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <HelpCircle className="ml-2 h-5 w-5 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Find quick answers to frequently asked questions</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </h2>
                    </div>
                    {/* Add FAQ content here */}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-10 md:p-16">
                        <BadgeCheck className="h-12 w-12 text-white mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Apply now and get a decision within minutes. Our team is here to help you every step of the way.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                className="bg-white text-teal-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl"
                                onClick={() => window.location.href = '/apply'}
                            >
                                Apply Now
                                <ArrowUp className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                                onClick={() => window.location.href = '/contact'}
                            >
                                Talk to an Expert
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductPage;