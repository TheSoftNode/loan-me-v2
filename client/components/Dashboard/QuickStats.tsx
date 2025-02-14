import {
    DollarSign, ArrowUpRight,
    FileText,
    TrendingUp, CalendarDays,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoanDetails } from "@/lib/type";

const QuickStats = ({ loanDetails }: { loanDetails: LoanDetails }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${loanDetails.amount.toLocaleString()}</div>
                    <Progress value={(loanDetails.totalPaid / loanDetails.amount) * 100} className="mt-2" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${loanDetails.remainingBalance.toLocaleString()}</div>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {((loanDetails.totalPaid / loanDetails.amount) * 100).toFixed(1)}% paid
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                    <CalendarDays className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${loanDetails.nextPaymentAmount.toLocaleString()}</div>
                    <p className="text-sm text-gray-500">Due {loanDetails.nextPaymentDate}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Term Progress</CardTitle>
                    <FileText className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{loanDetails.completedTerms}/{loanDetails.term}</div>
                    <Progress value={(loanDetails.completedTerms / loanDetails.term) * 100} className="mt-2" />
                </CardContent>
            </Card>
        </div>
    );
};

export default QuickStats;