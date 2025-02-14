"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

interface PersonalInformationProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const PersonalInformation = ({ user, onUpdate }: PersonalInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                disabled={!isEditing}
                value={formData.firstName}
                onChange={(e) => 
                  setFormData({...formData, firstName: e.target.value})
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                disabled={!isEditing}
                value={formData.lastName}
                onChange={(e) => 
                  setFormData({...formData, lastName: e.target.value})
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                disabled={!isEditing}
                value={formData.phone}
                onChange={(e) => 
                  setFormData({...formData, phone: e.target.value})
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                disabled={!isEditing}
                value={formData.dateOfBirth}
                onChange={(e) => 
                  setFormData({...formData, dateOfBirth: e.target.value})
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              disabled={!isEditing}
              value={formData.address}
              onChange={(e) => 
                setFormData({...formData, address: e.target.value})
              }
            />
          </div>
          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onUpdate(formData);
                  setIsEditing(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;