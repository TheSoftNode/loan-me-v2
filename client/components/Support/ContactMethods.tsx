import { Phone, MessageSquare, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ContactMethodsProps {
    onLiveChatClick: () => void;
}

const ContactMethods = ({ onLiveChatClick }: ContactMethodsProps) => (
    <Card className="lg:col-span-1">
        <CardHeader>
            <CardTitle>Contact Methods</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="text-blue-500" />
                <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-gray-600">1-800-123-4567</p>
                </div>
            </div>
            <div 
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={onLiveChatClick}
            >
                <MessageSquare className="text-blue-500" />
                <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-blue-500" />
                <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-gray-600">support@example.com</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default ContactMethods;