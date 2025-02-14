import { DollarSign, Clock, TrendingUp, Wallet, PiggyBank } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FormDataType, LoanType } from '@/lib/type';
import { calculateMonthlyPayment } from '@/utils/calculations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface LoanCalculatorProps {
    selectedLoan: LoanType;
    formData: FormDataType;
    onChange: (data: Partial<FormDataType>) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
    selectedLoan,
    formData,
    onChange,
}) => {
    const monthlyPayment = formData.amount && formData.term
        ? calculateMonthlyPayment(
            Number(formData.amount),
            selectedLoan.baseRate,
            Number(formData.term)
        )
        : 0;

    const totalPayment = monthlyPayment * Number(formData.term);
    const totalInterest = totalPayment - Number(formData.amount);
    const progressValue = (Number(formData.amount) / selectedLoan.maxAmount) * 100;

    return (
        <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/20 shadow-xl">
            <CardHeader className="relative space-y-4">
                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20 blur-3xl -z-10" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Loan Calculator
                </CardTitle>
                <CardDescription className="text-slate-600">
                    Estimate your monthly payments based on your loan amount and term
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Loan Amount</Label>
                        <div className="relative group">
                            <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-indigo-100 group-hover:to-blue-100 transition-colors">
                                <DollarSign className="h-4 w-4 text-indigo-600" />
                            </div>
                            <Input
                                type="number"
                                className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={(e) => onChange({ amount: e.target.value })}
                                min={selectedLoan.minAmount}
                                max={selectedLoan.maxAmount}
                            />
                        </div>
                        <div className="space-y-1">
                            <Progress
                                value={progressValue}
                                className="h-2 bg-slate-100"
                                // indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>${selectedLoan.minAmount.toLocaleString()}</span>
                                <span>${selectedLoan.maxAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Loan Term (months)</Label>
                        <div className="relative group">
                            <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100 group-hover:from-green-100 group-hover:to-teal-100 transition-colors">
                                <Clock className="h-4 w-4 text-teal-600" />
                            </div>
                            <Input
                                type="number"
                                className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
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
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-teal-500/5 rounded-lg" />
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100">
                                        <Wallet className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-medium">Monthly Payment</span>
                                </div>
                                <span className="block text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                    ${monthlyPayment.toFixed(2)}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-teal-100">
                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium">Total Interest</span>
                                </div>
                                <span className="block text-2xl font-bold text-blue-600">
                                    ${totalInterest.toFixed(2)}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100">
                                        <PiggyBank className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm font-medium">Total Payment</span>
                                </div>
                                <span className="block text-2xl font-bold text-teal-600">
                                    ${totalPayment.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};