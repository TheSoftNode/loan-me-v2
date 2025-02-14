"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Smartphone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Switch } from "../ui/switch";

const SecuritySettings = () =>
{
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Change Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Change Password</h3>
          <div className="space-y-2">
            <div className="relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button className="mt-2">Update Password</Button>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={setIs2FAEnabled}
            />
          </div>
          {is2FAEnabled && (
            <div className="space-y-4 mt-4">
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertTitle>Setup Required</AlertTitle>
                <AlertDescription>
                  Scan the QR code with your authenticator app to enable 2FA
                </AlertDescription>
              </Alert>
              <div className="flex justify-center">
                <img src="/api/placeholder/200/200" alt="2FA QR Code" className="border p-4 rounded" />
              </div>
              <Input placeholder="Enter verification code" />
              <Button>Verify and Enable 2FA</Button>
            </div>
          )}
        </div>

        {/* Login History */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Recent Login Activity</h3>
          <div className="space-y-2">
            {[
              { device: 'Windows PC - Chrome', location: 'New York, US', time: '2 hours ago' },
              { device: 'iPhone 13 - Safari', location: 'New York, US', time: '1 day ago' },
            ].map((login, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{login.device}</p>
                  <p className="text-sm text-gray-600">{login.location}</p>
                </div>
                <span className="text-sm text-gray-500">{login.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
