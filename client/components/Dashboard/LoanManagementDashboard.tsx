"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import
{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

const LoanManagementDashboard = () =>
{
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    // Define the possible status values
    type LoanStatus = 'approved' | 'pending' | 'rejected' | 'paid' | 'upcoming';

    // Define the loan details interface
    interface LoanDetails
    {
        loanId: string;
        amount: number;
        status: LoanStatus;  // Using our LoanStatus type here
        disbursedAmount: number;
        remainingBalance: number;
        totalPaid: number;
        nextPaymentDate: string;
        nextPaymentAmount: number;
        interestRate: number;
        term: number;
        completedTerms: number;
    }

    // Now define the loan details with the proper type
    const loanDetails: LoanDetails = {
        loanId: "L123456",
        amount: 50000,
        status: "approved", // TypeScript will ensure this is a valid LoanStatus
        disbursedAmount: 48500,
        remainingBalance: 35000,
        totalPaid: 15000,
        nextPaymentDate: "2024-11-15",
        nextPaymentAmount: 1250,
        interestRate: 8.5,
        term: 48,
        completedTerms: 12
    };

    // Create an interface for a single repayment entry
    interface RepaymentEntry
    {
        date: string;
        amount: number;
        status: LoanStatus;  // Using our LoanStatus type
        principal: number;
        interest: number;
    }

    // Type the repayment schedule array
    const repaymentSchedule: RepaymentEntry[] = [
        {
            date: "2024-10-15",
            amount: 1250,
            status: "paid",
            principal: 950,
            interest: 300
        },
        {
            date: "2024-11-15",
            amount: 1250,
            status: "upcoming",
            principal: 975,
            interest: 275
        },
        {
            date: "2024-12-15",
            amount: 1250,
            status: "upcoming",
            principal: 990,
            interest: 260
        }
    ];

    const progressData = [
        { month: 'Jun', balance: 48000 },
        { month: 'Jul', balance: 46500 },
        { month: 'Aug', balance: 45000 },
        { month: 'Sep', balance: 43500 },
        { month: 'Oct', balance: 42000 }
    ];


    // Define the styles object with the correct type
    const styles: Record<LoanStatus, string> = {
        approved: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        rejected: "bg-red-100 text-red-800",
        paid: "bg-green-100 text-green-800",
        upcoming: "bg-blue-100 text-blue-800"
    };

    const getStatusBadge = (status: LoanStatus) =>
    {
        return (
            <Badge className={styles[status]}>
                {status === 'approved' && <CheckCircle2 className="w-4 h-4 mr-1" />}
                {status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                {status === 'rejected' && <XCircle className="w-4 h-4 mr-1" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Loan Management</h1>
                        <p className="text-gray-500">Loan ID: {loanDetails.loanId}</p>
                    </div>
                    <Button
                        className="w-full md:w-auto"
                        onClick={() => setShowPaymentDialog(true)}
                    >
                        Make Early Payment
                    </Button>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Loan Amount</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">${loanDetails.amount.toLocaleString()}</span>
                                {getStatusBadge(loanDetails.status)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Remaining Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <span className="text-2xl font-bold">${loanDetails.remainingBalance.toLocaleString()}</span>
                                <Progress value={((loanDetails.totalPaid / loanDetails.amount) * 100)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Next Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <span className="text-2xl font-bold">${loanDetails.nextPaymentAmount}</span>
                                <p className="text-sm text-gray-500">Due {loanDetails.nextPaymentDate}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Term Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <span className="text-2xl font-bold">{loanDetails.completedTerms}/{loanDetails.term} months</span>
                                <Progress value={(loanDetails.completedTerms / loanDetails.term) * 100} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="details" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <TabsTrigger value="details">Loan Details</TabsTrigger>
                        <TabsTrigger value="schedule">Repayment Schedule</TabsTrigger>
                        <TabsTrigger value="progress">Payment Progress</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <Card>
                            <CardHeader>
                                <CardTitle>Loan Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Interest Rate</p>
                                            <p className="text-lg">{loanDetails.interestRate}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Loan Term</p>
                                            <p className="text-lg">{loanDetails.term} months</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Disbursed Amount</p>
                                            <p className="text-lg">${loanDetails.disbursedAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Paid</p>
                                            <p className="text-lg">${loanDetails.totalPaid.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Remaining Balance</p>
                                            <p className="text-lg">${loanDetails.remainingBalance.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Next Payment Date</p>
                                            <p className="text-lg">{loanDetails.nextPaymentDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="schedule">
                        <Card>
                            <CardHeader>
                                <CardTitle>Repayment Schedule</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Principal</TableHead>
                                                <TableHead>Interest</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {repaymentSchedule.map((payment, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{payment.date}</TableCell>
                                                    <TableCell>${payment.amount}</TableCell>
                                                    <TableCell>${payment.principal}</TableCell>
                                                    <TableCell>${payment.interest}</TableCell>
                                                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="progress">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={progressData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="balance"
                                                stroke="#2563eb"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Early Payment Dialog */}
                <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Make Early Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                                Making an early payment can help reduce your overall interest. Would you like to proceed with making an early payment?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Proceed to Payment</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default LoanManagementDashboard;