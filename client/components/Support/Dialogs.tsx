import
    {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
    } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FAQ } from '@/lib/type';

interface DialogsProps
{
    showFeedbackConfirmation: boolean;
    setShowFeedbackConfirmation: (show: boolean) => void;
    isLiveChatOpen: boolean;
    setIsLiveChatOpen: (open: boolean) => void;
    selectedFAQ: FAQ | null;
    setSelectedFAQ: (faq: FAQ | null) => void;
}

export const Dialogs = ({
    showFeedbackConfirmation,
    setShowFeedbackConfirmation,
    isLiveChatOpen,
    setIsLiveChatOpen,
    selectedFAQ,
    setSelectedFAQ,
}: DialogsProps) => (
    <>
        <Dialog open={showFeedbackConfirmation} onOpenChange={setShowFeedbackConfirmation}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Thank You for Your Feedback!</DialogTitle>
                    <DialogDescription>
                        We appreciate you taking the time to share your experience with us. Your feedback helps us improve our services.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button onClick={() => setShowFeedbackConfirmation(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

        <Dialog open={isLiveChatOpen} onOpenChange={setIsLiveChatOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Live Chat Support</DialogTitle>
                    <DialogDescription>
                        Connect with our support team instantly
                    </DialogDescription>
                </DialogHeader>
                <div className="h-96 bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Live Chat Interface would go here
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        <Dialog open={!!selectedFAQ} onOpenChange={() => setSelectedFAQ(null)}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{selectedFAQ?.question}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-gray-600 space-y-4">
                    <p>{selectedFAQ?.answer}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Related Articles</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Guide to loan application process</li>
                            <li>Understanding interest rates</li>
                            <li>Document requirements</li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </>
);