"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormStatus('success');

        // Reset after showing success message
        setTimeout(() => {
            setFormStatus('idle');
            setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            subtext: "Monday to Friday, 9am to 6pm",
            link: "tel:+15551234567"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Us",
            details: "support@loanme.com",
            subtext: "We'll respond within 24 hours",
            link: "mailto:support@loanme.com"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Visit Us",
            details: "123 Finance Street, NY 10001",
            subtext: "Find us on Google Maps",
            link: "https://maps.google.com"
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen mt-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-teal-600 text-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        Get in Touch
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        Let&apos;s Connect
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We&apos;re here to help. Choose your preferred way to reach us below.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    className="grid md:grid-cols-3 gap-4 mb-16"
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="initial"
                    animate="animate"
                >
                    {contactInfo.map((info, index) => (
                        <motion.a
                            href={info.link}
                            key={index}
                            variants={fadeInUp}
                            onHoverStart={() => setActiveSection(index)}
                            onHoverEnd={() => setActiveSection(null)}
                            className="block group"
                        >
                            <Card className="bg-white h-full transition-all duration-300 hover:shadow-xl">
                                <CardContent className="p-6">
                                    <motion.div
                                        className={`rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 ${activeSection === index
                                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                                            : 'bg-gradient-to-r from-cyan-50 to-teal-50 text-teal-600'
                                            }`}
                                    >
                                        {info.icon}
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                                    <p className="text-base text-gray-600 mb-1">{info.details}</p>
                                    <p className="text-sm text-gray-500">{info.subtext}</p>
                                    <div className="mt-3 flex items-center text-teal-600 group-hover:text-teal-700">
                                        <span className="text-sm font-medium">Learn more</span>
                                        <motion.div
                                            className="ml-2"
                                            animate={{ x: activeSection === index ? 5 : 0 }}
                                        >
                                            →
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Contact Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl mx-auto"
                >
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-5 min-h-[600px]">
                                {/* Form Info Section */}
                                <div className="md:col-span-2 bg-gradient-to-br from-cyan-500 to-teal-500 p-8 text-white">
                                    <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <MessageSquare className="w-6 h-6 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">Chat with Us</h3>
                                                <p className="text-white/80 text-sm">Our friendly team is here to help.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <Clock className="w-6 h-6 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">24/7 Support</h3>
                                                <p className="text-white/80 text-sm">Round the clock assistance for you.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <AlertCircle className="w-6 h-6 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">Quick Response</h3>
                                                <p className="text-white/80 text-sm">Get answers within 24 hours.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className="md:col-span-3 p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    placeholder="John"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    placeholder="Doe"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                placeholder="How can we help?"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us more about your inquiry..."
                                                className="h-32"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                                            disabled={formStatus === 'loading'}
                                        >
                                            {formStatus === 'loading' ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>

                                        <AnimatePresence>
                                            {formStatus === 'success' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                >
                                                    <Alert className="bg-green-50 text-green-800 border-green-200">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        <AlertDescription>
                                                            Message sent successfully! We&apos;ll get back to you soon.
                                                        </AlertDescription>
                                                    </Alert>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default ContactPage;