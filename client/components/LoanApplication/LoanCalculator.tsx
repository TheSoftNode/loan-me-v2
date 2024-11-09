import { DollarSign, Clock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FormDataType, LoanType } from '@/lib/type';
import { calculateMonthlyPayment } from '@/utils/calculations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface LoanCalculatorProps
{
    selectedLoan: LoanType;
    formData: FormDataType;
    onChange: (data: Partial<FormDataType>) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
    selectedLoan,
    formData,
    onChange,
}) =>
{
    const monthlyPayment = formData.amount && formData.term
        ? calculateMonthlyPayment(
            Number(formData.amount),
            selectedLoan.baseRate,
            Number(formData.term)
        )
        : 0;

    const totalPayment = monthlyPayment * Number(formData.term);
    const totalInterest = totalPayment - Number(formData.amount);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>
                    Estimate your monthly payments based on your loan amount and term
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label>Loan Amount</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={(e) => onChange({ amount: e.target.value })}
                                min={selectedLoan.minAmount}
                                max={selectedLoan.maxAmount}
                            />
                        </div>
                        <Progress
                            value={(Number(formData.amount) / selectedLoan.maxAmount) * 100}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>Loan Term (months)</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="Enter term"
                                value={formData.term}
                                onChange={(e) => onChange({ term: e.target.value })}
                                min={selectedLoan.minTerm}
                                max={selectedLoan.maxTerm}
                            />
                        </div>
                    </div>
                </div>

                {formData.amount && formData.term && (
                    <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Monthly Payment</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${monthlyPayment.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Total Interest</span>
                                    <span className="font-medium">${totalInterest.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Total Payment</span>
                                    <span className="font-medium">${totalPayment.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};