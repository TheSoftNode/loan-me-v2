"use client"
import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileUser
{
    name: string;
    email: string;
    avatarUrl?: string;
    initials: string;
    kycStatus: string;
    joinDate: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    address: string;
}

interface ProfileHeaderProps
{
    user: ProfileUser;
    onEdit: (field: 'avatar') => void;
}

const ProfileHeader = ({ user, onEdit }: ProfileHeaderProps) =>
{
    return (
        <div className="relative mb-6">
            {/* Responsive height for banner */}
            <div className="h-32 sm:h-40 md:h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />

            {/* Responsive positioning and layout for profile section */}
            <div className="absolute -bottom-16 left-0 sm:left-6 w-full px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Avatar section */}
                    <div className="relative -mt-16 sm:-mt-0">
                        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-0 right-0 rounded-full scale-75 sm:scale-100"
                            onClick={() => onEdit('avatar')}
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Profile info section */}
                    <div className="text-center sm:text-left mb-4 w-full sm:w-auto">
                        <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>

                        {/* Badges */}
                        <div className="flex items-center justify-center sm:justify-start mt-2 space-x-2 flex-wrap gap-y-2">
                            <Badge variant={user.kycStatus === 'verified' ? 'default' : 'destructive'}>
                                {user.kycStatus === 'verified' ? 'Verified' : 'Verification Pending'}
                            </Badge>
                            <Badge variant="outline" className="whitespace-nowrap">
                                Member since {user.joinDate}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;