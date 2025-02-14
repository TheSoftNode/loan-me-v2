import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormDataType, LoanType } from '@/lib/type';
import { useToast } from '@/hooks/use-toast';
import { ProgressTracker } from './ProgressTracker';
import { LoanCard } from './LoanCard';
import { LoanCalculator } from './LoanCalculator';
import { ApplicationForm } from './ApplicationForm';
import { ReviewApplication } from './ReviewApplication';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LoanApplicationProps {
    loanTypes: LoanType[];
    onSubmit: (applicationData: any) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ loanTypes, onSubmit }) => {
    const [step, setStep] = useState<number>(1);
    const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState<FormDataType>({
        amount: '',
        term: '',
        purpose: '',
        employment: '',
        income: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        creditScore: '',
    });

    const updateFormData = (newData: Partial<FormDataType>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleSubmit = () => {
        setShowConfirmDialog(true);
    };

    const confirmSubmit = () => {
        onSubmit({
            loanType: selectedLoan,
            ...formData,
            submissionDate: new Date().toISOString(),
        });

        setShowConfirmDialog(false);
        toast({
            title: "Application Submitted Successfully",
            description: "Your loan application has been received. We'll review it and contact you soon.",
            duration: 5000,
            className: "bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 text-indigo-800",
        });
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return !!selectedLoan;
            case 2:
                return !!formData.amount && !!formData.term;
            case 3:
                return !!(
                    formData.firstName &&
                    formData.lastName &&
                    formData.email &&
                    formData.phone &&
                    formData.address &&
                    formData.creditScore &&
                    formData.purpose &&
                    formData.employment &&
                    formData.income
                );
            default:
                return true;
        }
    };

    const steps = ['Select Loan', 'Calculate', 'Apply', 'Review'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="relative">
                    <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20 blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-br from-indigo-100/20 via-teal-100/20 to-blue-100/20 blur-3xl -z-10" />

                    <ProgressTracker currentStep={step} steps={steps} />

                    <div className="mt-12 space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-xl" />
                            <div className="relative p-1">
                                {step === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                                        {loanTypes.map((loan) => (
                                            <LoanCard
                                                key={loan.id}
                                                loan={loan}
                                                isSelected={selectedLoan?.id === loan.id}
                                                onSelect={setSelectedLoan}
                                            />
                                        ))}
                                    </div>
                                )}

                                {step === 2 && selectedLoan && (
                                    <div className="animate-in fade-in slide-in-from-right duration-500">
                                        <LoanCalculator
                                            selectedLoan={selectedLoan}
                                            formData={formData}
                                            onChange={updateFormData}
                                        />
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="animate-in fade-in slide-in-from-right duration-500">
                                        <ApplicationForm
                                            formData={formData}
                                            onChange={updateFormData}
                                        />
                                    </div>
                                )}

                                {step === 4 && selectedLoan && (
                                    <div className="animate-in fade-in slide-in-from-right duration-500">
                                        <ReviewApplication
                                            selectedLoan={selectedLoan}
                                            formData={formData}
                                            onBack={() => setStep(step - 1)}
                                            onSubmit={handleSubmit}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {step < 4 && (
                            <div className="flex justify-end gap-4 px-4 py-6">
                                {step > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep(step - 1)}
                                        className="min-w-[120px] border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                )}
                                <Button
                                    onClick={() => setStep(step + 1)}
                                    disabled={!validateStep()}
                                    className="min-w-[120px] bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <AlertDialogContent className="bg-gradient-to-br from-white to-slate-50/95 backdrop-blur-sm border border-slate-200">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                                Confirm Submission
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-600">
                                Are you sure you want to submit your loan application? Please ensure all information is accurate.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmSubmit}
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all"
                            >
                                Submit Application
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default LoanApplication;