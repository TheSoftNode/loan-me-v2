import { DollarSign, User, Mail, Phone, MapPin, BadgeCheck, Briefcase, Target } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormDataType } from '@/lib/type';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ApplicationFormProps {
    formData: FormDataType;
    onChange: (data: Partial<FormDataType>) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ formData, onChange }) => (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/20 shadow-xl">
        <CardHeader className="relative space-y-4">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20 blur-3xl -z-10" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Loan Application
            </CardTitle>
            <CardDescription className="text-slate-600">
                Please provide your information below to process your application
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-teal-500/5 rounded-lg" />
                <div className="relative space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-slate-700">First Name</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                                    <User className="h-4 w-4 text-indigo-600" />
                                </div>
                                <Input
                                    className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={(e) => onChange({ firstName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-slate-700">Last Name</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                                    <User className="h-4 w-4 text-indigo-600" />
                                </div>
                                <Input
                                    className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={(e) => onChange({ lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-slate-700">Email</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 group-hover:from-teal-100 group-hover:to-blue-100 transition-all">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                </div>
                                <Input
                                    type="email"
                                    className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) => onChange({ email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-slate-700">Phone</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 group-hover:from-teal-100 group-hover:to-blue-100 transition-all">
                                    <Phone className="h-4 w-4 text-blue-600" />
                                </div>
                                <Input
                                    type="tel"
                                    className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={(e) => onChange({ phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Address</Label>
                        <div className="relative group">
                            <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100 group-hover:from-green-100 group-hover:to-teal-100 transition-all">
                                <MapPin className="h-4 w-4 text-teal-600" />
                            </div>
                            <Input
                                className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={(e) => onChange({ address: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Credit Score Range</Label>
                        <Select
                            value={formData.creditScore}
                            onValueChange={(value) => onChange({ creditScore: value })}
                        >
                            <SelectTrigger className="h-12 bg-white/50 border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100">
                                        <BadgeCheck className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <SelectValue placeholder="Select credit score range" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-sm border-slate-200">
                                <SelectItem value="excellent">Excellent (750+)</SelectItem>
                                <SelectItem value="good">Good (700-749)</SelectItem>
                                <SelectItem value="fair">Fair (650-699)</SelectItem>
                                <SelectItem value="poor">Poor (Below 650)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Loan Purpose</Label>
                        <Select
                            value={formData.purpose}
                            onValueChange={(value) => onChange({ purpose: value })}
                        >
                            <SelectTrigger className="h-12 bg-white/50 border-slate-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-teal-100">
                                        <Target className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <SelectValue placeholder="Select purpose" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-sm border-slate-200">
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Employment Status</Label>
                        <Select
                            value={formData.employment}
                            onValueChange={(value) => onChange({ employment: value })}
                        >
                            <SelectTrigger className="h-12 bg-white/50 border-slate-200 hover:border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100">
                                        <Briefcase className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <SelectValue placeholder="Select status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-sm border-slate-200">
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-slate-700">Monthly Income</Label>
                        <div className="relative group">
                            <div className="absolute left-3 top-3 p-1.5 rounded-full bg-gradient-to-br from-green-100 to-teal-100 group-hover:from-teal-100 group-hover:to-green-100 transition-all">
                                <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <Input
                                type="number"
                                className="pl-12 h-12 bg-white/50 border-slate-200 hover:border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="Enter monthly income"
                                value={formData.income}
                                onChange={(e) => onChange({ income: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default ApplicationForm;