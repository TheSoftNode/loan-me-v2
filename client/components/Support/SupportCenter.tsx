"use client"

import { useState } from 'react';
import
{
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { FAQ, FAQCategory, FeedbackFormData } from '@/lib/type';
import FAQSearch from './FAQSearch';
import FAQCategoryCard from './FAQCategoryCard';
import ContactMethods from './ContactMethods';
import SupportForm from './SupportForm';
import FeedbackForm from './FeedbackForm';
import { Dialogs } from './Dialogs';


const SupportCenter = () =>
{
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbackForm, setFeedbackForm] = useState<FeedbackFormData>({
        rating: 0,
        category: '',
        comment: ''
    });
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
    const [showFeedbackConfirmation, setShowFeedbackConfirmation] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

    // FAQ Categories Data
    const faqCategories: FAQCategory[] = [
        {
            id: 'loans',
            name: 'Loan Information',
            icon: <svg className="w-6 h-6" />, // Replace with your icon
            questions: [
                {
                    id: 'loan-1',
                    question: 'What are the eligibility criteria for a loan?',
                    answer: 'Eligibility criteria include age (18+ years), minimum income requirements, credit score, and employment status. Specific requirements may vary based on the loan type.'
                },
                {
                    id: 'loan-2',
                    question: 'How long does the loan approval process take?',
                    answer: 'The loan approval process typically takes 24-48 hours. Once approved, funds are disbursed within 1-3 business days.'
                },
            ]
        },
        {
            id: 'payments',
            name: 'Payments & Billing',
            icon: <svg className="w-6 h-6" />, // Replace with your icon
            questions: [
                {
                    id: 'payment-1',
                    question: 'What payment methods are accepted?',
                    answer: 'We accept bank transfers, debit cards, credit cards, and automated clearing house (ACH) payments.'
                },
            ]
        },
    ];

    // Filter FAQs based on search query
    // const filteredFAQs = faqCategories.flatMap(category =>
    //     category.questions.filter(faq =>
    //         faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    // );

    // Handler for feedback submission
    const handleFeedbackSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        setShowFeedbackConfirmation(true);
        setFeedbackForm({ rating: 0, category: '', comment: '' }); // Reset form
    };

    return (
        <div className="container mx-auto px-4 py-14 max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    How can we help you today?
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions, get support, or share your feedback with us.
                </p>
            </div>

            {/* Main Navigation Tabs */}
            <Tabs defaultValue="faqs" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                {/* FAQs Tab Content */}
                <TabsContent value="faqs">
                    <div className="space-y-6">
                        <FAQSearch
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {faqCategories.map((category) => (
                                <FAQCategoryCard
                                    key={category.id}
                                    category={category}
                                    onFAQSelect={setSelectedFAQ}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Support Tab Content */}
                <TabsContent value="support">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <ContactMethods onLiveChatClick={() => setIsLiveChatOpen(true)} />
                        <SupportForm />
                    </div>
                </TabsContent>

                {/* Feedback Tab Content */}
                <TabsContent value="feedback">
                    <FeedbackForm
                        feedbackForm={feedbackForm}
                        onFeedbackChange={setFeedbackForm}
                        onSubmit={handleFeedbackSubmit}
                    />
                </TabsContent>
            </Tabs>

            {/* Dialogs */}
            <Dialogs
                showFeedbackConfirmation={showFeedbackConfirmation}
                setShowFeedbackConfirmation={setShowFeedbackConfirmation}
                isLiveChatOpen={isLiveChatOpen}
                setIsLiveChatOpen={setIsLiveChatOpen}
                selectedFAQ={selectedFAQ}
                setSelectedFAQ={setSelectedFAQ}
            />
        </div>
    );
};

export default SupportCenter;