import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { FormDataType, LoanType } from '@/lib/type';

interface ReviewApplicationProps
{
  selectedLoan: LoanType;
  formData: FormDataType;
  onBack: () => void;
  onSubmit: () => void;
}

export const ReviewApplication: React.FC<ReviewApplicationProps> = ({
  selectedLoan,
  formData,
  onBack,
  onSubmit,
}) => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>Review Your Application</CardTitle>
      <CardDescription>Please review your loan details before submitting</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please review all information carefully. You cannot modify your application after submission.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="loan-details">
          <AccordionTrigger>Loan Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Loan Type</span>
                <span className="font-medium">{selectedLoan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">${Number(formData.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Term</span>
                <span className="font-medium">{formData.term} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-medium">{selectedLoan.baseRate}% APR</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="personal-details">
          <AccordionTrigger>Personal Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Full Name</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address</span>
                <span className="font-medium">{formData.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Credit Score Range</span>
                <span className="font-medium">{formData.creditScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Purpose</span>
                <span className="font-medium">{formData.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Employment</span>
                <span className="font-medium">{formData.employment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Income</span>
                <span className="font-medium">${Number(formData.income).toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="terms">
          <AccordionTrigger>Terms & Conditions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-sm text-gray-600">
              <p>By submitting this application, you acknowledge and agree to the following terms:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>All information provided is accurate and complete</li>
                <li>You authorize us to verify your information</li>
                <li>You understand this is an application and not a guarantee of approval</li>
                <li>You agree to our privacy policy and terms of service</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button onClick={onSubmit}>
        Submit Application
      </Button>
    </CardFooter>
  </Card>
);
