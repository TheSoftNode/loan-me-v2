"use client"

import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import
{
    Bell,
    CreditCard,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    PlusCircle,
    AlertCircle,
    FileText,
    TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';
// import { useProtectedData } from '@/hooks/useProtectedData';
// import toast from 'react-hot-toast';

interface LoanData
{
    id: string;
    amount: number;
    interestRate: number;
    nextPaymentDate: string;
    remainingBalance: number;
    status: 'active' | 'pending' | 'completed';
}

interface Transaction
{
    id: string;
    type: 'payment' | 'disbursement' | 'fee';
    amount: number;
    date: string;
    description: string;
}

interface Notification
{
    id: string;
    type: 'payment' | 'promotion' | 'reminder';
    message: string;
    date: string;
    isRead: boolean;
}

interface DashboardProps
{
    userData: {
        name: string;
        accountBalance: number;
        savingsBalance: number;
        creditScore: number;
    };
    loans: LoanData[];
    transactions: Transaction[];
    notifications: Notification[];
}

const MainDashboard: React.FC<DashboardProps> = ({
    userData,
    loans,
    transactions,
    notifications
}) =>
{

    // const { fetchDashboardData, loading, error } = useProtectedData();
    // const [dashboardData, setDashboardData] = useState(null);

    // useEffect(() =>
    // {
    //     const loadDashboardData = async () =>
    //     {
    //         try
    //         {
    //             const data = await fetchDashboardData();
    //             setDashboardData(data);
    //         } catch (error)
    //         {
    //             toast.error('Failed to load dashboard data');
    //         }
    //     };

    //     loadDashboardData();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    // Calculate total outstanding balance
    const totalOutstanding = loans.reduce((sum, loan) =>
        loan.status === 'active' ? sum + loan.remainingBalance : sum, 0
    );

    // Mock data for the chart
    const chartData = [
        { month: 'Jan', balance: 5000 },
        { month: 'Feb', balance: 4800 },
        { month: 'Mar', balance: 4600 },
        { month: 'Apr', balance: 4200 },
        { month: 'May', balance: 3800 },
        { month: 'Jun', balance: 3400 },
    ];

    // Get next payment info
    // const nextPayment = loans
    //     .filter(loan => loan.status === 'active')
    //     .sort((a, b) => new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime())[0];

    return (
        <div className="px-6 py-10 space-y-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name}</h1>
                    <p className="text-gray-500">Here&apos;s your financial overview</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Link href={"/LoanApplication"} className='flex'>
                        <PlusCircle className="mr-2 h-4 w-4 mt-1" />
                        Apply for New Loan
                    </Link>

                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</div>
                        <p className="text-xs text-gray-500">Across {loans.filter(l => l.status === 'active').length} active loans</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                        <CreditCard className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${userData.accountBalance.toLocaleString()}</div>
                        <div className="flex items-center text-xs text-green-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            +2.5% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userData.creditScore}</div>
                        <p className="text-xs text-gray-500">Good standing</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loan Overview */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Loan Repayment Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <XAxis dataKey="month" stroke="#888888" />
                                    <YAxis stroke="#888888" />
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

                {/* Active Loans */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {loans.filter(loan => loan.status === 'active').map(loan => (
                                <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Loan #{loan.id}</p>
                                        <p className="text-sm text-gray-500">
                                            Next payment: {new Date(loan.nextPaymentDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">${loan.remainingBalance.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">{loan.interestRate}% APR</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>Notifications</CardTitle>
                        <Bell className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.slice(0, 4).map(notification => (
                                <Alert key={notification.id} className="border-l-4 border-blue-600">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="text-sm">
                                        {notification.message}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notification.date).toLocaleDateString()}
                                        </p>
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>Recent Transactions</CardTitle>
                        <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.slice(0, 5).map(transaction => (
                                <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <div className={`p-2 rounded-full mr-3 ${transaction.type === 'payment' ? 'bg-green-100' :
                                            transaction.type === 'disbursement' ? 'bg-blue-100' : 'bg-gray-100'
                                            }`}>
                                            {transaction.type === 'payment' ?
                                                <ArrowUpRight className="h-4 w-4 text-green-600" /> :
                                                <ArrowDownRight className="h-4 w-4 text-blue-600" />
                                            }
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={`font-bold ${transaction.type === 'payment' ? 'text-green-600' :
                                        transaction.type === 'disbursement' ? 'text-blue-600' : 'text-gray-600'
                                        }`}>
                                        {transaction.type === 'payment' ? '-' : '+'}
                                        ${transaction.amount.toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MainDashboard;