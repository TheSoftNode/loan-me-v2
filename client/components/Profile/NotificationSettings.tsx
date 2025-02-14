"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

// Notifications Settings Component 
const NotificationSettings = () =>
{
    const [settings, setSettings] = useState({
        email: {
            security: true,
            updates: false,
            marketing: false
        },
        push: {
            security: true,
            updates: true,
            marketing: false
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                        <h3 className="font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Security Alerts</Label>
                                    <p className="text-sm text-gray-500">Get notified about security events</p>
                                </div>
                                <Switch
                                    checked={settings.email.security}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            email: { ...prev.email, security: checked }
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Product Updates</Label>
                                    <p className="text-sm text-gray-500">Learn about new features</p>
                                </div>
                                <Switch
                                    checked={settings.email.updates}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            email: { ...prev.email, updates: checked }
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Marketing</Label>
                                    <p className="text-sm text-gray-500">Receive marketing communications</p>
                                </div>
                                <Switch
                                    checked={settings.email.marketing}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            email: { ...prev.email, marketing: checked }
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="pt-6 border-t">
                        <h3 className="font-medium mb-4">Push Notifications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Security Alerts</Label>
                                    <p className="text-sm text-gray-500">Get notified about security events</p>
                                </div>
                                <Switch
                                    checked={settings.push.security}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            push: { ...prev.push, security: checked }
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Product Updates</Label>
                                    <p className="text-sm text-gray-500">Learn about new features</p>
                                </div>
                                <Switch
                                    checked={settings.push.updates}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            push: { ...prev.push, updates: checked }
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Marketing</Label>
                                    <p className="text-sm text-gray-500">Receive marketing communications</p>
                                </div>
                                <Switch
                                    checked={settings.push.marketing}
                                    onCheckedChange={(checked) =>
                                        setSettings(prev => ({
                                            ...prev,
                                            push: { ...prev.push, marketing: checked }
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationSettings;
