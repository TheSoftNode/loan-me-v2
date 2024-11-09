import React, { useState } from 'react';
import
{
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

interface LoanApplicationProps
{
    loanTypes: LoanType[];
    onSubmit: (applicationData: any) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ loanTypes, onSubmit }) =>
{
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

    const updateFormData = (newData: Partial<FormDataType>) =>
    {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleSubmit = () =>
    {
        setShowConfirmDialog(true);
    };

    const confirmSubmit = () =>
    {
        onSubmit({
            loanType: selectedLoan,
            ...formData,
            submissionDate: new Date().toISOString(),
        });

        setShowConfirmDialog(false);
        toast({
            title: "Application Submitted",
            description: "Your loan application has been successfully submitted. We'll contact you soon.",
            duration: 5000,
        });
    };

    const validateStep = () =>
    {
        switch (step)
        {
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
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <ProgressTracker currentStep={step} steps={steps} />

                <div className="space-y-6">
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <LoanCalculator
                            selectedLoan={selectedLoan}
                            formData={formData}
                            onChange={updateFormData}
                        />
                    )}

                    {step === 3 && (
                        <ApplicationForm
                            formData={formData}
                            onChange={updateFormData}
                        />
                    )}

                    {step === 4 && selectedLoan && (
                        <ReviewApplication
                            selectedLoan={selectedLoan}
                            formData={formData}
                            onBack={() => setStep(step - 1)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>

                {step < 4 && (
                    <div className="flex justify-end gap-4">
                        {step > 1 && (
                            <Button variant="outline" onClick={() => setStep(step - 1)}>
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={!validateStep()}
                        >
                            Continue
                        </Button>
                    </div>
                )}

                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to submit your loan application? Please ensure all information is accurate.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmSubmit}>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default LoanApplication;