import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, Settings2 } from 'lucide-react';
import { LoanType } from '@/lib/type';

interface CustomLoanBuilderProps {
    onCreateLoan: (loan: LoanType) => void;
}

export const CustomLoanBuilder: React.FC<CustomLoanBuilderProps> = ({ onCreateLoan }) => {
    const [customLoan, setCustomLoan] = useState<Partial<LoanType>>({
        id: 'custom',
        name: 'Custom Loan',
        description: '',
        minAmount: 1000,
        maxAmount: 50000,
        minTerm: 12,
        maxTerm: 60,
        baseRate: 5.5,
        requirements: [],
        features: []
    });

    const handleSubmit = () => {
        onCreateLoan(customLoan as LoanType);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full h-full min-h-[200px] border-2 border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all"
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <PlusCircle className="h-8 w-8 text-slate-400" />
                        <div className="text-center">
                            <h3 className="font-semibold text-slate-700">Custom Loan</h3>
                            <p className="text-sm text-slate-500">Create a customized loan type</p>
                        </div>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Settings2 className="w-5 h-5 mr-2 text-indigo-600" />
                        Custom Loan Builder
                    </DialogTitle>
                    <DialogDescription>
                        Design a loan that meets your specific needs
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Loan Name</Label>
                            <Input
                                id="name"
                                value={customLoan.name}
                                onChange={(e) => setCustomLoan({ ...customLoan, name: e.target.value })}
                                placeholder="Enter loan name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={customLoan.description}
                                onChange={(e) => setCustomLoan({ ...customLoan, description: e.target.value })}
                                placeholder="Enter loan description"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Label>Amount Range</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    type="number"
                                    value={customLoan.minAmount}
                                    onChange={(e) => setCustomLoan({ ...customLoan, minAmount: Number(e.target.value) })}
                                    placeholder="Min amount"
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    value={customLoan.maxAmount}
                                    onChange={(e) => setCustomLoan({ ...customLoan, maxAmount: Number(e.target.value) })}
                                    placeholder="Max amount"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Label>Term Range (months)</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    type="number"
                                    value={customLoan.minTerm}
                                    onChange={(e) => setCustomLoan({ ...customLoan, minTerm: Number(e.target.value) })}
                                    placeholder="Min term"
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    value={customLoan.maxTerm}
                                    onChange={(e) => setCustomLoan({ ...customLoan, maxTerm: Number(e.target.value) })}
                                    placeholder="Max term"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label>Interest Rate (%)</Label>
                        <Slider
                            value={[customLoan.baseRate || 5.5]}
                            onValueChange={(value) => setCustomLoan({ ...customLoan, baseRate: value[0] })}
                            min={1}
                            max={20}
                            step={0.1}
                            className="mt-2"
                        />
                        <p className="text-sm text-slate-500 mt-1">
                            Current rate: {customLoan.baseRate}%
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600"
                        onClick={handleSubmit}
                    >
                        Create Custom Loan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};