"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import
{
    CreditCard,
    Building,
    Wallet,
    CalendarDays,
    Search,
    Download,
    Filter,
    CheckCircle2,
} from 'lucide-react';

// Types
type PaymentMethod = {
    id: string;
    type: 'bank' | 'card' | 'wallet';
    name: string;
    details: string;
    isDefault?: boolean;
};

type Transaction = {
    id: string;
    date: string;
    type: 'payment' | 'disbursement' | 'refund';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    method: string;
    reference: string;
};

const PaymentAndTransaction = () =>
{
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedMethod, setSelectedMethod] = useState<string>();
    const [amount, setAmount] = useState<string>("");

    // Sample data
    const paymentMethods: PaymentMethod[] = [
        {
            id: "1",
            type: "bank",
            name: "Chase Bank",
            details: "****6789",
            isDefault: true
        },
        {
            id: "2",
            type: "card",
            name: "Visa Credit",
            details: "****4321"
        },
        {
            id: "3",
            type: "wallet",
            name: "Digital Wallet",
            details: "wallet@email.com"
        }
    ];

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

    const getMethodIcon = (type: PaymentMethod['type']) =>
    {
        switch (type)
        {
            case 'bank':
                return <Building className="w-4 h-4" />;
            case 'card':
                return <CreditCard className="w-4 h-4" />;
            case 'wallet':
                return <Wallet className="w-4 h-4" />;
        }
    };

    const getStatusBadge = (status: Transaction['status']) =>
    {
        const styles = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800"
        };

        return (
            <Badge className={styles[status]}>
                {status === 'completed' && <CheckCircle2 className="w-4 h-4 mr-1" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <Tabs defaultValue="make-payment" className="space-y-6">
                    <TabsList className="grid h-auto w-full grid-cols-1 md:grid-cols-3 gap-4">
                        <TabsTrigger value="make-payment">Make a Payment</TabsTrigger>
                        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                        <TabsTrigger value="transactions">Transaction History</TabsTrigger>
                    </TabsList>

                    {/* Make a Payment Tab */}
                    <TabsContent value="make-payment">
                        <Card>
                            <CardHeader>
                                <CardTitle>Make a Payment</CardTitle>
                                <CardDescription>
                                    Choose your payment method and enter the amount
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Payment Method Selection */}
                                    <div className="space-y-4">
                                        <Label>Select Payment Method</Label>
                                        <div className="grid gap-4">
                                            {paymentMethods.map((method) => (
                                                <div
                                                    key={method.id}
                                                    className={cn(
                                                        "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors",
                                                        selectedMethod === method.id
                                                            ? "border-primary bg-primary/5"
                                                            : "hover:bg-gray-50"
                                                    )}
                                                    onClick={() => setSelectedMethod(method.id)}
                                                >
                                                    {getMethodIcon(method.type)}
                                                    <div className="flex-1">
                                                        <p className="font-medium">{method.name}</p>
                                                        <p className="text-sm text-gray-500">{method.details}</p>
                                                    </div>
                                                    {method.isDefault && (
                                                        <Badge variant="outline">Default</Badge>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Amount</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5">$</span>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="pl-8"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Payment Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !selectedDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarDays className="mr-2 h-4 w-4" />
                                                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={setSelectedDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <Button
                                            className="w-full mt-6"
                                            onClick={() => setShowConfirmation(true)}
                                            disabled={!selectedMethod || !amount || !selectedDate}
                                        >
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payment Methods Tab */}
                    <TabsContent value="payment-methods">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <div>
                                    <CardTitle>Payment Methods</CardTitle>
                                    <CardDescription>
                                        Manage your payment methods and preferences
                                    </CardDescription>
                                </div>
                                <Button>Add New Method</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center space-x-4">
                                                {getMethodIcon(method.type)}
                                                <div>
                                                    <p className="font-medium">{method.name}</p>
                                                    <p className="text-sm text-gray-500">{method.details}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {method.isDefault && (
                                                    <Badge variant="outline">Default</Badge>
                                                )}
                                                <Button variant="ghost" size="sm">Edit</Button>
                                                <Button variant="ghost" size="sm">Remove</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Transaction History Tab */}
                    <TabsContent value="transactions">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <CardTitle>Transaction History</CardTitle>
                                        <CardDescription>
                                            View and manage your transaction history
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                        <Button variant="outline">
                                            <Download className="w-4 h-4 mr-2" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Filters */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Transaction Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="payment">Payments</SelectItem>
                                                <SelectItem value="disbursement">Disbursements</SelectItem>
                                                <SelectItem value="refund">Refunds</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="failed">Failed</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Time Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="7">Last 7 days</SelectItem>
                                                <SelectItem value="30">Last 30 days</SelectItem>
                                                <SelectItem value="90">Last 90 days</SelectItem>
                                                <SelectItem value="custom">Custom Range</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <div className="relative">
                                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Search transactions..."
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>

                                    {/* Transactions Table */}
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Reference</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Method</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {transactions.map((transaction) => (
                                                    <TableRow key={transaction.id}>
                                                        <TableCell>{transaction.date}</TableCell>
                                                        <TableCell>{transaction.reference}</TableCell>
                                                        <TableCell className="capitalize">{transaction.type}</TableCell>
                                                        <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                                                        <TableCell>{transaction.method}</TableCell>
                                                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                                        <TableCell>
                                                            <Button variant="ghost" size="sm">
                                                                View Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Payment Confirmation Dialog */}
                <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                                You are about to make a payment of ${amount} using your selected payment method.
                                Please confirm the details below are correct:
                                <div className="mt-4 space-y-2">
                                    <p><strong>Amount:</strong> ${amount}</p>
                                    <p><strong>Date:</strong> {selectedDate ? format(selectedDate, "PPP") : "N/A"}</p>
                                    <p><strong>Method:</strong> {paymentMethods.find(m => m.id === selectedMethod)?.name}</p>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm Payment</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default PaymentAndTransaction