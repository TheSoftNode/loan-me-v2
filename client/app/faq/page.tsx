"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  CreditCard,
  Clock,
  Shield,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'loan-basics',
      name: 'Loan Basics',
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
      description: 'Essential information about our loan services',
      questions: [
        {
          id: '1',
          question: 'What are the loan amounts available?',
          answer: 'We offer loans ranging from $1,000 to $50,000 based on your eligibility and requirements.',
          details: 'Loan amounts are determined based on factors including income, credit score, and existing obligations.',
          relatedTopics: ['Interest Rates', 'Eligibility Criteria']
        },
        {
          id: '2',
          question: 'What are the eligibility requirements?',
          answer: 'Basic requirements include being 18+ years old, having a regular income, and being a US resident.',
          details: 'Additional criteria may apply based on the loan type and amount requested.',
          relatedTopics: ['Documentation', 'Application Process']
        }
      ]
    },
    {
      id: 'application',
      name: 'Application Process',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      description: 'Guide to applying for a loan',
      questions: [
        {
          id: '3',
          question: 'How long does the application process take?',
          answer: 'Most applications are processed within 24 hours of submission.',
          details: 'The exact time may vary based on documentation verification and additional requirements.',
          relatedTopics: ['Required Documents', 'Approval Timeline']
        }
      ]
    },
    {
      id: 'repayment',
      name: 'Repayment Options',
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      description: 'Understanding loan repayment',
      questions: [
        {
          id: '4',
          question: 'What repayment terms are available?',
          answer: 'We offer flexible terms ranging from 12 to 60 months.',
          details: 'Choose a term that best fits your financial situation and goals.',
          relatedTopics: ['Early Repayment', 'Payment Schedule']
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: <Shield className="h-5 w-5 text-red-500" />,
      description: 'How we protect your information',
      questions: [
        {
          id: '5',
          question: 'How is my personal information protected?',
          answer: 'We use bank-level encryption and security measures to protect your data.',
          details: 'All sensitive information is encrypted and stored securely.',
          relatedTopics: ['Data Privacy', 'Security Measures']
        }
      ]
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
            Help Center
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to your questions about our loan services and processes.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for answers..."
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Category Quick Links */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              className={`p-4 rounded-xl border transition-all duration-300 ${activeCategory === category.id
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-200 hover:border-teal-500 hover:bg-gray-50'
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center space-x-3">
                {category.icon}
                <span className="font-medium text-gray-800">{category.name}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            (!activeCategory || activeCategory === category.id) && (
              <motion.div
                key={category.id}
                variants={itemVariants}
                layout
              >
                <Card className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      {category.icon}
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.questions.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="hover:text-teal-600">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <p className="text-gray-600">{faq.answer}</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-teal-50 hover:text-teal-600"
                                onClick={() => setSelectedFAQ(faq)}
                              >
                                View Details
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            )
          ))}
        </motion.div>

        {/* Still Need Help Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-10 md:p-16">
            <HelpCircle className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-white text-teal-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </motion.div>

        {/* FAQ Detail Dialog */}
        <Dialog open={!!selectedFAQ} onOpenChange={() => setSelectedFAQ(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedFAQ?.question}</DialogTitle>
              <DialogDescription className="text-lg pt-4">
                {selectedFAQ?.details}
              </DialogDescription>
            </DialogHeader>
            {selectedFAQ?.relatedTopics && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFAQ.relatedTopics.map((topic: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FAQPage;