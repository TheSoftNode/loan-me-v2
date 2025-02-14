import {
    Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Notification } from "@/lib/type";


const NotificationsPanel = ({ notifications }: { notifications: Notification[] }) => {
    const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
        const styles: Record<'high' | 'medium' | 'low', string> = {
            high: "bg-red-100 text-red-800",
            medium: "bg-yellow-100 text-yellow-800",
            low: "bg-green-100 text-green-800"
        };
        return <Badge className={styles[priority]}>{priority}</Badge>;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Recent Notifications</CardTitle>
                    <Bell className="h-4 w-4 text-gray-500" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <Alert key={notification.id}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <AlertDescription>
                                        <div className="font-medium">{notification.title}</div>
                                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                    </AlertDescription>
                                </div>
                                {getPriorityBadge(notification.priority)}
                            </div>
                        </Alert>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationsPanel