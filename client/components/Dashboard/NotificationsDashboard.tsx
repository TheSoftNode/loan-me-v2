"use client"

import React, { useState } from 'react';
import { Bell, Settings, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NotificationsDashboard = () =>
{
    const [notificationSettings, setNotificationSettings] = useState({
        email: true,
        push: true,
        sms: false
    });

    const notifications = [
        {
            id: 1,
            type: 'payment',
            title: 'Payment Reminder',
            message: 'Your subscription payment is due in 3 days',
            time: '2 hours ago',
            priority: 'high'
        },
        {
            id: 2,
            type: 'promotion',
            title: 'Special Offer',
            message: 'Get 20% off on your next upgrade',
            time: '1 day ago',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'status',
            title: 'Status Update',
            message: 'Your recent transaction has been processed',
            time: '2 days ago',
            priority: 'low'
        }
    ];

    const getPriorityColor = (priority: string) =>
    {
        switch (priority)
        {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Tabs defaultValue="notifications" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="notifications" className="flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="mr-4">
                                            {notification.type === 'payment' && (
                                                <AlertCircle className="w-6 h-6 text-red-500" />
                                            )}
                                            {notification.type === 'promotion' && (
                                                <Mail className="w-6 h-6 text-blue-500" />
                                            )}
                                            {notification.type === 'status' && (
                                                <MessageSquare className="w-6 h-6 text-green-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">{notification.title}</h3>
                                                <Badge
                                                    className={`${getPriorityColor(
                                                        notification.priority
                                                    )} ml-2`}
                                                >
                                                    {notification.priority}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 mt-1">{notification.message}</p>
                                            <span className="text-sm text-gray-400 mt-2 block">
                                                {notification.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Email Notifications</h3>
                                        <p className="text-sm text-gray-600">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.email}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({
                                                ...notificationSettings,
                                                email: checked
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Push Notifications</h3>
                                        <p className="text-sm text-gray-600">
                                            Receive notifications in your browser
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.push}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({
                                                ...notificationSettings,
                                                push: checked
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">SMS Notifications</h3>
                                        <p className="text-sm text-gray-600">
                                            Receive notifications via text message
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.sms}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings({
                                                ...notificationSettings,
                                                sms: checked
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotificationsDashboard;