// "use client"
// import { useEffect, useState } from "react";
// import KYCVerification from "@/components/Profile/KYCVerification";
// import NotificationSettings from "@/components/Profile/NotificationSettings";
// import PersonalInformation from "@/components/Profile/PersonalInformation";
// import ProfileHeader from "@/components/Profile/ProfileHeader";
// import SecuritySettings from "@/components/Profile/SecuritySettings";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Bell, CheckCircle, Shield, User } from "lucide-react";
// // import { useUser } from "@/hooks/useUser";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";
// import { UserProfile } from "@/lib/type";

// interface ProfileData
// {
//     name: string;
//     email: string;
//     avatarUrl: string;
//     initials: string;
//     kycStatus: string;
//     joinDate: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     dateOfBirth: string;
//     address: string;
// }

// const ProfilePage = () =>
// {
//     // const { user, loading, error, updateProfile } = useUser();
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null);

//     const getInitials = (firstName: string, lastName: string) =>
//     {
//         return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//     };

//     const formatProfileData = (userData: UserProfile): ProfileData =>
//     {
//         return {
//             name: `${userData.firstName} ${userData.lastName}`,
//             email: userData.email,
//             avatarUrl: userData.photoURL || '/api/placeholder/100/100',
//             initials: getInitials(userData.firstName, userData.lastName),
//             kycStatus: 'pending', // You might want to add this to your UserProfile type
//             joinDate: new Date(userData.createdAt).toLocaleDateString('en-US', {
//                 month: 'short',
//                 year: 'numeric'
//             }),
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             phone: '', // Add these fields to UserProfile if needed
//             dateOfBirth: '',
//             address: ''
//         };
//     };

//     if (loading)
//     {
//         return (
//             <div className="container mx-auto px-4 py-8 space-y-6">
//                 <div className="space-y-4">
//                     <Skeleton className="h-24 w-full" />
//                     <Skeleton className="h-12 w-full" />
//                     <Skeleton className="h-64 w-full" />
//                 </div>
//             </div>
//         );
//     }

//     if (error)
//     {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <Alert variant="destructive">
//                     <AlertCircle className="h-4 w-4" />
//                     <AlertDescription>
//                         {error}
//                     </AlertDescription>
//                 </Alert>
//             </div>
//         );
//     }

//     if (!user)
//     {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <Alert>
//                     <AlertDescription>
//                         No user profile found. Please try logging in again.
//                     </AlertDescription>
//                 </Alert>
//             </div>
//         );
//     }

//     const profileData = formatProfileData(user);

//     const handleProfileUpdate = async (updatedData: Partial<ProfileData>) =>
//     {
//         // Convert ProfileData format to UserProfile format
//         const userProfileUpdates = {
//             firstName: updatedData.firstName,
//             lastName: updatedData.lastName,
//             // Add other fields as needed
//         };

//         const success = await updateProfile(userProfileUpdates);
//         if (!success)
//         {
//             // Handle error - you might want to show a toast notification
//             console.error('Failed to update profile');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <ProfileHeader
//                 user={profileData}
//                 onEdit={(type) => console.log('Edit', type)}
//             />

//             <div className="mt-20">
//                 <Tabs defaultValue="personal" className="space-y-6">
//                     <TabsList className="grid w-full sm:grid-cols-3 h-auto gap-2 md:grid-cols-4">
//                         <TabsTrigger value="personal">
//                             <User className="mr-2 h-4 w-4" />
//                             Personal
//                         </TabsTrigger>
//                         <TabsTrigger value="security">
//                             <Shield className="mr-2 h-4 w-4" />
//                             Security
//                         </TabsTrigger>
//                         <TabsTrigger value="verification">
//                             <CheckCircle className="mr-2 h-4 w-4" />
//                             Verification
//                         </TabsTrigger>
//                         <TabsTrigger value="notifications">
//                             <Bell className="mr-2 h-4 w-4" />
//                             Notifications
//                         </TabsTrigger>
//                     </TabsList>

//                     <TabsContent value="personal" className="space-y-6">
//                         <PersonalInformation
//                             user={profileData}
//                             onUpdate={handleProfileUpdate}
//                         />
//                     </TabsContent>

//                     <TabsContent value="security">
//                         <SecuritySettings />
//                     </TabsContent>

//                     <TabsContent value="verification">
//                         <KYCVerification />
//                     </TabsContent>

//                     <TabsContent value="notifications">
//                         <NotificationSettings />
//                     </TabsContent>
//                 </Tabs>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;