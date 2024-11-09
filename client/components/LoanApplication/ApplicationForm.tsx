import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormDataType } from '@/lib/type';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ApplicationFormProps
{
    formData: FormDataType;
    onChange: (data: Partial<FormDataType>) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ formData, onChange }) => (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Loan Application</CardTitle>
            <CardDescription>Please provide your information below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>First Name</Label>
                    <Input
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => onChange({ firstName: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Last Name</Label>
                    <Input
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => onChange({ lastName: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Phone</Label>
                    <Input
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => onChange({ phone: e.target.value })}
                    />
                </div>
            </div>
            <div>
                <Label>Address</Label>
                <Input
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => onChange({ address: e.target.value })}
                />
            </div>
            <div>
                <Label>Credit Score Range</Label>
                <Select
                    value={formData.creditScore}
                    onValueChange={(value) => onChange({ creditScore: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="excellent">Excellent (750+)</SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (Below 650)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Loan Purpose</Label>
                <Select
                    value={formData.purpose}
                    onValueChange={(value) => onChange({ purpose: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Employment Status</Label>
                <Select
                    value={formData.employment}
                    onValueChange={(value) => onChange({ employment: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Monthly Income</Label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        type="number"
                        className="pl-10"
                        placeholder="Enter monthly income"
                        value={formData.income}
                        onChange={(e) => onChange({ income: e.target.value })}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);