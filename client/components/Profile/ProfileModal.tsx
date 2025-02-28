"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useCreateProfileMutation, useUpdateProfileMutation } from "@/src/service/queries/authApi";
import { Profile } from "@/src/types/auth";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    existingProfile?: Profile;
}

const EMPLOYMENT_STATUSES = [
    'employed',
    'self_employed',
    'unemployed',
    'retired'
] as const;

const ProfileModal = ({ isOpen, onClose, existingProfile }: ProfileModalProps) => {
    const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const [formData, setFormData] = useState({
        phone_number: existingProfile?.phone_number || '',
        date_of_birth: existingProfile?.date_of_birth || '',
        monthly_income: existingProfile?.monthly_income || '',
        employment_status: existingProfile?.employment_status || 'employed',
        employer_name: existingProfile?.employer_name || '',
        job_title: existingProfile?.job_title || '',
        address: {
            street_address: existingProfile?.address?.street_address || '',
            city: existingProfile?.address?.city || '',
            state: existingProfile?.address?.state || '',
            postal_code: existingProfile?.address?.postal_code || '',
            country: existingProfile?.address?.country || '',
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            monthly_income: Number(formData.monthly_income),
        };

        try {
            const action = existingProfile ? updateProfile : createProfile;

            await toast.promise(
                action(submitData).unwrap(),
                {
                    loading: `${existingProfile ? 'Updating' : 'Creating'} profile...`,
                    success: `Profile ${existingProfile ? 'updated' : 'created'} successfully!`,
                    error: (err) => err.data?.error || `Failed to ${existingProfile ? 'update' : 'create'} profile`
                }
            );

            onClose();
        } catch (error) {
            console.error('Profile operation failed:', error);
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] h-[calc(100vh-40px)] overflow-auto p-4">
                <div className="h-full flex flex-col">
                    <div className="p-6 flex-shrink-0">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-teal-600">
                                {existingProfile ? 'Update Profile' : 'Create Profile'}
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto -mr-4 pr-4">
                        <form onSubmit={handleSubmit} id="profile-form" className="space-y-6 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Personal Information */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone_number}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={formData.date_of_birth}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        required
                                    />
                                </div>

                                {/* Employment Information */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Monthly Income</label>
                                    <input
                                        type="number"
                                        value={formData.monthly_income}
                                        onChange={(e) => setFormData(prev => ({ ...prev, monthly_income: e.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Employment Status</label>
                                    <select
                                        value={formData.employment_status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, employment_status: e.target.value as any }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                        required
                                    >
                                        {EMPLOYMENT_STATUSES.map(status => (
                                            <option key={status} value={status}>
                                                {status.split('_').map(word =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {formData.employment_status === 'employed' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600">Employer Name</label>
                                            <input
                                                type="text"
                                                value={formData.employer_name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, employer_name: e.target.value }))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600">Job Title</label>
                                            <input
                                                type="text"
                                                value={formData.job_title}
                                                onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Address Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-700">Address Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-slate-600">Street Address</label>
                                        <input
                                            type="text"
                                            value={formData.address.street_address}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, street_address: e.target.value }
                                            }))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">City</label>
                                        <input
                                            type="text"
                                            value={formData.address.city}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, city: e.target.value }
                                            }))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">State</label>
                                        <input
                                            type="text"
                                            value={formData.address.state}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, state: e.target.value }
                                            }))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">Postal Code</label>
                                        <input
                                            type="text"
                                            value={formData.address.postal_code}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, postal_code: e.target.value }
                                            }))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">Country</label>
                                        <input
                                            type="text"
                                            value={formData.address.country}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, country: e.target.value }
                                            }))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <span>{existingProfile ? 'Update' : 'Create'} Profile</span>
                                </button>
                            </div> */}
                        </form>
                    </div>

                    <div className="p-6 border-t border-slate-200 flex-shrink-0 bg-white">
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="profile-form"
                                className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                <span>{existingProfile ? 'Update' : 'Create'} Profile</span>
                            </button>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;