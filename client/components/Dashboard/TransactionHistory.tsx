import {
    Download, Filter, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/lib/type";

const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
    const getStatusBadge = (status: Transaction['status']) => {
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
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>View your recent transactions</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Reference</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell className="capitalize">{transaction.type}</TableCell>
                                <TableCell>
                                    <span className={transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}>
                                        {transaction.type === 'payment' ? '-' : '+'}${transaction.amount.toLocaleString()}
                                    </span>
                                </TableCell>
                                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                <TableCell>{transaction.reference}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TransactionHistory;