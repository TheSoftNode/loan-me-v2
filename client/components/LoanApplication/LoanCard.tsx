import { BadgeCheck, CheckCircle2, Shield, Check, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanType } from '../../lib/type';

interface LoanCardProps {
    loan: LoanType;
    isSelected: boolean;
    onSelect: (loan: LoanType) => void;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan, isSelected, onSelect }) => (
    <Card
        className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl 
            bg-gradient-to-br from-white via-blue-50/20 to-teal-50/30
            ${isSelected
                ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-100/50'
                : 'hover:border-blue-200'}
            before:absolute before:inset-0 before:rounded-lg 
            before:bg-gradient-to-br before:from-blue-500/5 before:via-teal-500/5 before:to-indigo-500/5 
            before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
        onClick={() => onSelect(loan)}
    >
        <CardHeader className="relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20 blur-3xl -z-10" />
            <CardTitle className="flex items-center justify-between text-indigo-950">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {loan.name}
                </span>
                {isSelected && (
                    <CheckCircle2 className="h-6 w-6 text-indigo-500 animate-in fade-in duration-300" />
                )}
            </CardTitle>
            <CardDescription className="text-slate-600">{loan.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="group flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50/30 hover:from-blue-50/50 hover:to-indigo-50/30 transition-all">
                    <span className="text-sm font-medium text-slate-600">Amount Range</span>
                    <span className="font-semibold text-blue-700 group-hover:text-indigo-700 transition-colors">
                        ${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}
                    </span>
                </div>
                <div className="group flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-50 to-teal-50/30 hover:from-teal-50/50 hover:to-green-50/30 transition-all">
                    <span className="text-sm font-medium text-slate-600">Interest Rate</span>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-teal-700 group-hover:text-green-700 transition-colors">
                            From {loan.baseRate}%
                        </span>
                        <span className="text-sm text-slate-500">APR</span>
                    </div>
                </div>
                <div className="group flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-50 to-indigo-50/30 hover:from-indigo-50/50 hover:to-blue-50/30 transition-all">
                    <span className="text-sm font-medium text-slate-600">Term Range</span>
                    <span className="font-semibold text-indigo-700 group-hover:text-blue-700 transition-colors">
                        {loan.minTerm} - {loan.maxTerm} months
                    </span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100">
            <div className="w-full space-y-4 pt-2">
                {/* Features Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-slate-700">Key Features</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {loan.features.slice(0, 4).map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-1.5"
                            >
                                <Check className="h-3.5 w-3.5 text-teal-600 mt-0.5" />
                                <span className="text-xs text-slate-600">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700">Requirements</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {loan.requirements.slice(0, 4).map((requirement, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-1.5"
                            >
                                <Shield className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                                <span className="text-xs text-slate-600">{requirement}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CardFooter>
    </Card>
);

export default LoanCard;