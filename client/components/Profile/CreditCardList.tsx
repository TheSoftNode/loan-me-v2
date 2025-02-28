"use client";

import { useDeleteCreditCardMutation, useSetDefaultCardMutation } from "@/src/service/queries/authApi";
import { CreditCard } from "@/src/types/auth";
import { Loader2, Star, StarOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface CreditCardListProps {
    cards: CreditCard[];
}

const CreditCardList = ({ cards }: CreditCardListProps) => {
    const [deleteCard, { isLoading: isDeleting }] = useDeleteCreditCardMutation();
    const [setDefault, { isLoading: isSettingDefault }] = useSetDefaultCardMutation();

    const handleDelete = async (cardId: string) => {
        try {
            await toast.promise(
                deleteCard(cardId).unwrap(),
                {
                    loading: 'Deleting card...',
                    success: 'Card deleted successfully!',
                    error: (err) => err.data?.error || 'Failed to delete card'
                }
            );
        } catch (error) {
            console.error('Delete card failed:', error);
        }
    };

    const handleSetDefault = async (cardId: string) => {
        try {
            await toast.promise(
                setDefault(cardId).unwrap(),
                {
                    loading: 'Setting as default...',
                    success: 'Default card updated!',
                    error: (err) => err.data?.error || 'Failed to set default card'
                }
            );
        } catch (error) {
            console.error('Set default failed:', error);
        }
    };

    return (
        <div className="space-y-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`p-4 rounded-lg border ${card.is_default ? 'border-teal-200 bg-teal-50' : 'border-slate-200 bg-white'
                        } relative`}
                >
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold text-slate-700">
                                    {card.card_type.charAt(0).toUpperCase() + card.card_type.slice(1)}
                                </span>
                                <span className="text-slate-500">
                                    •••• {card.masked_card_number}
                                </span>
                            </div>
                            <div className="text-sm text-slate-500">
                                Expires {card.expiry_month.toString().padStart(2, '0')}/{card.expiry_year}
                            </div>
                            <div className="text-sm text-slate-600">
                                {card.name_on_card}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {!card.is_default && (
                                <button
                                    onClick={() => handleSetDefault(card.id)}
                                    disabled={isSettingDefault}
                                    className="p-2 text-slate-500 hover:text-teal-600 transition-colors"
                                    title="Set as default"
                                >
                                    {isSettingDefault ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <StarOff className="h-5 w-5" />
                                    )}
                                </button>
                            )}
                            {card.is_default && (
                                <div className="p-2 text-teal-600" title="Default card">
                                    <Star className="h-5 w-5 fill-current" />
                                </div>
                            )}
                            <button
                                onClick={() => handleDelete(card.id)}
                                disabled={isDeleting || card.is_default}
                                className={`p-2 ${card.is_default
                                        ? 'text-slate-300 cursor-not-allowed'
                                        : 'text-slate-500 hover:text-red-600'
                                    } transition-colors`}
                                title={card.is_default ? "Cannot delete default card" : "Delete card"}
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Trash2 className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CreditCardList;