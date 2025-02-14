import React, { useState } from 'react';
import {
    PlusCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { LoanDetails, Transaction, Notification } from "@/lib/type";
import QuickStats from './QuickStats';
import NotificationsPanel from './NotificationsPanel';
import TransactionHistory from './TransactionHistory';
import Link from 'next/link';

const LoanDashboard = () => {
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    // Sample data
    const loanDetails: LoanDetails = {
        loanId: "L123456",
        amount: 50000,
        status: "active",
        disbursedAmount: 48500,
        remainingBalance: 35000,
        totalPaid: 15000,
        nextPaymentDate: "2024-11-15",
        nextPaymentAmount: 1250,
        interestRate: 8.5,
        term: 48,
        completedTerms: 12
    };

    const transactions: Transaction[] = [
        {
            id: "T1",
            date: "2024-10-15",
            type: "payment",
            amount: 1250,
            status: "completed",
            method: "Chase Bank",
            reference: "REF123456"
        },
        {
            id: "T2",
            date: "2024-10-01",
            type: "disbursement",
            amount: 50000,
            status: "completed",
            method: "Bank Transfer",
            reference: "DISB123456"
        }
    ];

    const notifications: Notification[] = [
        {
            id: "1",
            type: "payment",
            title: "Payment Due Soon",
            message: "Your next payment of $1,250 is due in 3 days",
            time: "2 hours ago",
            priority: "high"
        },
        {
            id: "2",
            type: "promotion",
            title: "Rate Reduction Available",
            message: "You may qualify for a lower interest rate",
            time: "1 day ago",
            priority: "medium"
        }
    ];

    const progressData = [
        { month: 'Jun', balance: 48000 },
        { month: 'Jul', balance: 46500 },
        { month: 'Aug', balance: 45000 },
        { month: 'Sep', balance: 43500 },
        { month: 'Oct', balance: 42000 }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Loan Dashboard</h1>
                        <p className="text-gray-500">Loan ID: {loanDetails.loanId}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowPaymentDialog(true)}>
                            Make Payment
                        </Button>
                        <Link href={"/apply"}>
                            <Button>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Apply for New Loan
                            </Button>
                        </Link>

                    </div>
                </div>

                {/* Quick Stats */}
                <QuickStats loanDetails={loanDetails} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Progress Chart */}
                    <Card className="lg:col-span-2">
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

                    {/* Notifications Panel */}
                    <NotificationsPanel notifications={notifications} />
                </div>

                {/* Transaction History */}
                <TransactionHistory transactions={transactions} />

                {/* Payment Dialog */}
                <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Make a Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your next payment of ${loanDetails.nextPaymentAmount} is due on {loanDetails.nextPaymentDate}.
                                Would you like to proceed with the payment?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue to Payment</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default LoanDashboard;