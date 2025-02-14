import { Star, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FeedbackFormData } from '@/lib/type';

interface FeedbackFormProps
{
    feedbackForm: FeedbackFormData;
    onFeedbackChange: (feedback: FeedbackFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const FeedbackForm = ({ feedbackForm, onFeedbackChange, onSubmit }: FeedbackFormProps) => (
    <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                    Help us improve our services by sharing your experience
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Rate your experience
                        </label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Button
                                    key={rating}
                                    variant={feedbackForm.rating === rating ? 'default' : 'outline'}
                                    size="icon"
                                    onClick={() => onFeedbackChange({ ...feedbackForm, rating })}
                                    className="w-10 h-10"
                                    type="button"
                                >
                                    <Star
                                        className={`h-5 w-5 ${feedbackForm.rating >= rating ? 'fill-current' : ''}`}
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            What area would you like to rate?
                        </label>
                        <Select
                            onValueChange={(value) =>
                                onFeedbackChange({ ...feedbackForm, category: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="loan-process">Loan Process</SelectItem>
                                <SelectItem value="customer-service">Customer Service</SelectItem>
                                <SelectItem value="app-experience">App Experience</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="feedback" className="text-sm font-medium">
                            Additional Comments
                        </label>
                        <Textarea
                            id="feedback"
                            placeholder="Tell us more about your experience..."
                            className="min-h-32"
                            value={feedbackForm.comment}
                            onChange={(e) =>
                                onFeedbackChange({ ...feedbackForm, comment: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">
                            Submit Feedback
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
);

export default FeedbackForm;