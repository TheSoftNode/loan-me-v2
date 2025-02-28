"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, CreditCard } from "lucide-react";
import { useAddCreditCardMutation } from "@/src/service/queries/authApi";

interface CreditCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CARD_TYPES = ['visa', 'mastercard', 'amex'] as const;

const CreditCardModal = ({ isOpen, onClose }: CreditCardModalProps) => {
    const [addCard, { isLoading }] = useAddCreditCardMutation();

    const [formData, setFormData] = useState({
        card_type: 'visa' as typeof CARD_TYPES[number],
        card_number: '',
        cvc: '',
        expiry_month: '',
        expiry_year: '',
        name_on_card: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (formData.card_number.length < 15 || formData.card_number.length > 16) {
            toast.error('Invalid card number');
            return;
        }

        if (formData.cvc.length < 3 || formData.cvc.length > 4) {
            toast.error('Invalid CVC');
            return;
        }

        const currentYear = new Date().getFullYear();
        const expiryYear = parseInt(formData.expiry_year);
        if (expiryYear < currentYear) {
            toast.error('Card has expired');
            return;
        }

        try {
            await toast.promise(
                addCard({
                    ...formData,
                    expiry_month: parseInt(formData.expiry_month),
                    expiry_year: parseInt(formData.expiry_year),
                }).unwrap(),
                {
                    loading: 'Adding card...',
                    success: 'Card added successfully!',
                    error: (err) => err.data?.error || 'Failed to add card'
                }
            );

            onClose();
        } catch (error) {
            console.error('Add card failed:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-teal-600 flex items-center gap-2">
                        <CreditCard className="h-6 w-6" />
                        Add Payment Method
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600">Card Type</label>
                            <select
                                value={formData.card_type}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    card_type: e.target.value as typeof CARD_TYPES[number]
                                }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                required
                            >
                                {CARD_TYPES.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600">Card Number</label>
                            <input
                                type="text"
                                value={formData.card_number}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 16) {
                                        setFormData(prev => ({ ...prev, card_number: value }));
                                    }
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                placeholder="**** **** **** ****"
                                required
                                maxLength={16}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Expiry Month</label>
                                <select
                                    value={formData.expiry_month}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        expiry_month: e.target.value
                                    }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    required
                                >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month}>
                                            {month.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Expiry Year</label>
                                <select
                                    value={formData.expiry_year}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        expiry_year: e.target.value
                                    }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                    required
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600">Name on Card</label>
                            <input
                                type="text"
                                value={formData.name_on_card}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    name_on_card: e.target.value
                                }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                placeholder="Enter name as shown on card"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600">CVC</label>
                            <input
                                type="text"
                                value={formData.cvc}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 4) {
                                        setFormData(prev => ({ ...prev, cvc: value }));
                                    }
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                placeholder="***"
                                required
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>Add Card</span>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreditCardModal;