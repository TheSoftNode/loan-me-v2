import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SupportForm = () => (
    <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>Submit a Request</CardTitle>
            <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                    </label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="loan">Loan Inquiry</SelectItem>
                            <SelectItem value="payment">Payment Issue</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Describe your issue or question"
                        className="min-h-32"
                    />
                </div>

                <div className="flex justify-end">
                    <Button>
                        Submit Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
);

export default SupportForm;
