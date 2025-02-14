"use client"

import React from 'react';
import { Building2, Users2, Target, ChevronRight, Globe, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

function AboutPage() {
    const stats = [
        {
            number: "10K+",
            label: "Active Users",
            icon: <Users2 className="h-5 w-5 text-cyan-500" />
        },
        {
            number: "$50M+",
            label: "Loans Processed",
            icon: <Globe className="h-5 w-5 text-teal-500" />
        },
        {
            number: "98%",
            label: "Satisfaction Rate",
            icon: <Shield className="h-5 w-5 text-cyan-500" />
        },
        {
            number: "24/7",
            label: "Customer Support",
            icon: <Zap className="h-5 w-5 text-teal-500" />
        },
    ];

    const values = [
        {
            icon: <Users2 className="h-8 w-8 text-white" />,
            title: "Customer First",
            description: "We prioritize our customers' needs and provide personalized financial solutions that adapt to their unique circumstances.",
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: <Target className="h-8 w-8 text-white" />,
            title: "Transparency",
            description: "Clear communication and no hidden fees - we believe in complete honesty and building trust through transparent practices.",
            color: "from-teal-500 to-emerald-500"
        },
        {
            icon: <Building2 className="h-8 w-8 text-white" />,
            title: "Innovation",
            description: "Leveraging cutting-edge technology to make loan processes faster, more efficient, and accessible to everyone.",
            color: "from-blue-500 to-indigo-500"
        }
    ];

    return (
        <div className="min-h-screen mt-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-teal-600 text-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        About Us
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl py-3 font-bold mb-4 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        Reimagining Modern Lending
                        {/* <br /> */}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Transforming the lending industry through innovative technology and unwavering trust, making financial freedom accessible to everyone.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative overflow-hidden bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                            variants={fadeInUp}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-bl-full" />
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-2 p-2 rounded-lg bg-gray-50">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Section */}
                <div className="mb-16">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide us in revolutionizing the lending experience
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl opacity-90 transition-all duration-300 group-hover:opacity-100`} />
                                <div className="relative p-8 text-white">
                                    <div className="bg-white/20 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{value.description}</p>
                                    <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                                        <span className="text-sm">Learn more</span>
                                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-2">
                                <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-8 text-white">
                                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                                    <p className="text-lg leading-relaxed text-white/90">
                                        To democratize lending by providing accessible, transparent, and fair financial solutions that empower individuals to achieve their goals and secure their future.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us?</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Advanced technology for faster approvals",
                                            "Personalized loan solutions",
                                            "Transparent fee structure",
                                            "Dedicated customer support"
                                        ].map((item, index) => (
                                            <motion.li
                                                key={index}
                                                className="flex items-center text-gray-600 text-sm"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-3" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default AboutPage;