"use client";

import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, CreditCard, Calendar, Mail, AlertCircle, Plus } from "lucide-react";
import { format } from 'date-fns';
import { useState } from 'react';
import ProfileModal from './ProfileModal';
import CreditCardModal from './CreditCardModal';
import CreditCardList from './CreditCardList';
import { useGetUserDetailsQuery } from "@/src/service/queries/authApi";

const ProfilePage = () => {
    const { data: user, isLoading, error } = useGetUserDetailsQuery();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 p-8">
                <div className="flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                </div>
            </div>
        );
    }

    if (error || !user) {
        const errorMessage = error && 'data' in error ? error.data?.error : 'Failed to load profile';
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 p-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 pt-16 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Basic Information Card */}
                <Card className="p-6 shadow-lg border-teal-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-teal-600">Profile Information</h2>
                        <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-teal-100 text-teal-700'
                            }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-teal-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Full Name</p>
                                    <p className="text-slate-700">{user.first_name} {user.last_name}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-teal-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="text-slate-700">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-teal-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Member Since</p>
                                    <p className="text-slate-700">
                                        {format(new Date(user.created_at), 'MMMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <AlertCircle className="h-5 w-5 text-teal-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Verification Status</p>
                                    <div className={`flex items-center ${user.is_verified ? 'text-green-600' : 'text-amber-600'
                                        }`}>
                                        {user.is_verified ? '✓ Verified' : '⚠ Not Verified'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Profile Details Card */}
                <Card className="p-6 shadow-lg border-teal-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-teal-600">Profile Details</h3>
                        <button
                            onClick={() => setShowProfileModal(true)}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>{user.profile ? 'Update Profile' : 'Create Profile'}</span>
                        </button>
                    </div>

                    {!user.profile ? (
                        <div className="text-center py-8 text-slate-600">
                            <User className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                            <p>No profile information added yet</p>
                            <p className="text-sm text-slate-500 mt-1">
                                Add your profile details to unlock all features
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Profile information display */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-500">Phone Number</p>
                                    <p className="text-slate-700">{user.profile.phone_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Date of Birth</p>
                                    <p className="text-slate-700">
                                        {format(new Date(user.profile.date_of_birth), 'MMMM dd, yyyy')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Monthly Income</p>
                                    <p className="text-slate-700">
                                        ${user.profile.monthly_income.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-500">Employment Status</p>
                                    <p className="text-slate-700">
                                        {user.profile.employment_status.split('_').map(
                                            word => word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ')}
                                    </p>
                                </div>
                                {user.profile.employer_name && (
                                    <div>
                                        <p className="text-sm text-slate-500">Employer</p>
                                        <p className="text-slate-700">{user.profile.employer_name}</p>
                                    </div>
                                )}
                                {user.profile.job_title && (
                                    <div>
                                        <p className="text-sm text-slate-500">Job Title</p>
                                        <p className="text-slate-700">{user.profile.job_title}</p>
                                    </div>
                                )}
                            </div>
                            {/* Address Section */}
                            <div className="md:col-span-2">
                                <h4 className="text-lg font-semibold text-slate-700 mb-3">Address</h4>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-slate-700">{user.profile.address.street_address}</p>
                                    <p className="text-slate-700">
                                        {user.profile.address.city}, {user.profile.address.state} {user.profile.address.postal_code}
                                    </p>
                                    <p className="text-slate-700">{user.profile.address.country}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Credit Cards Section */}
                <Card className="p-6 shadow-lg border-teal-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-teal-600">Payment Methods</h3>
                        <button
                            onClick={() => setShowCardModal(true)}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Card</span>
                        </button>
                    </div>

                    {user.credit_cards?.length === 0 ? (
                        <div className="text-center py-8 text-slate-600">
                            <CreditCard className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                            <p>No payment methods added yet</p>
                            <p className="text-sm text-slate-500 mt-1">
                                Add a credit card to start applying for loans
                            </p>
                        </div>
                    ) : (
                        <CreditCardList cards={user.credit_cards || []} />
                    )}
                </Card>
            </div>

            {/* Modals */}
            <ProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                existingProfile={user.profile || undefined}
            />

            <CreditCardModal
                isOpen={showCardModal}
                onClose={() => setShowCardModal(false)}
            />
        </div>
    );
};

export default ProfilePage;
