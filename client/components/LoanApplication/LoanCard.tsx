import { BadgeCheck, CheckCircle2, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanType } from '../../lib/type';

interface LoanCardProps
{
    loan: LoanType;
    isSelected: boolean;
    onSelect: (loan: LoanType) => void;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan, isSelected, onSelect }) => (
    <Card
        className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-600' : ''
            }`}
        onClick={() => onSelect(loan)}
    >
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                {loan.name}
                {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
            </CardTitle>
            <CardDescription>{loan.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Amount Range</span>
                    <span className="font-medium">
                        ${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Interest Rate</span>
                    <span className="font-medium">From {loan.baseRate}% APR</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Term Range</span>
                    <span className="font-medium">{loan.minTerm} - {loan.maxTerm} months</span>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Quick approval process</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Secure application</span>
                </div>
            </div>
        </CardFooter>
    </Card>
);