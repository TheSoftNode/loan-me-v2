import { AlertCircle, FileText, User, Bookmark, ChevronDown } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { FormDataType, LoanType } from '@/lib/type';

interface ReviewApplicationProps {
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
  <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/20 shadow-xl">
    <CardHeader className="relative space-y-4">
      <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20 blur-3xl -z-10" />
      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
        Review Your Application
      </CardTitle>
      <CardDescription className="text-slate-600">
        Please review your loan details before submitting
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-8">
      <Alert className="border-indigo-200 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 text-indigo-800">
        <AlertCircle className="h-5 w-5 text-indigo-600" />
        <AlertDescription className="text-sm font-medium ml-2">
          Please review all information carefully. You cannot modify your application after submission.
        </AlertDescription>
      </Alert>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-teal-500/5 rounded-lg" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="loan-details" className="border-slate-200">
              <AccordionTrigger className="hover:bg-slate-50/80 px-4 py-4 text-slate-700 hover:text-indigo-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100">
                    <FileText className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="font-semibold">Loan Details</span>
                </div>
                {/* <ChevronDown className="h-5 w-5 text-indigo-400 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="space-y-3 bg-gradient-to-r from-slate-50 to-indigo-50/30 p-4 rounded-lg">
                  {[
                    { label: 'Loan Type', value: selectedLoan.name },
                    { label: 'Amount', value: `$${Number(formData.amount).toLocaleString()}` },
                    { label: 'Term', value: `${formData.term} months` },
                    { label: 'Interest Rate', value: `${selectedLoan.baseRate}% APR` }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-slate-200 last:border-0">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-medium text-indigo-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="personal-details" className="border-slate-200">
              <AccordionTrigger className="hover:bg-slate-50/80 px-4 py-4 text-slate-700 hover:text-blue-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-100 to-teal-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold">Personal Details</span>
                </div>
                {/* <ChevronDown className="h-5 w-5 text-blue-400 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="space-y-3 bg-gradient-to-r from-slate-50 to-blue-50/30 p-4 rounded-lg">
                  {[
                    { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}` },
                    { label: 'Email', value: formData.email },
                    { label: 'Phone', value: formData.phone },
                    { label: 'Address', value: formData.address },
                    { label: 'Credit Score Range', value: formData.creditScore },
                    { label: 'Purpose', value: formData.purpose },
                    { label: 'Employment', value: formData.employment },
                    { label: 'Monthly Income', value: `$${Number(formData.income).toLocaleString()}` }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-slate-200 last:border-0">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-medium text-blue-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms" className="border-slate-200">
              <AccordionTrigger className="hover:bg-slate-50/80 px-4 py-4 text-slate-700 hover:text-teal-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100">
                    <Bookmark className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="font-semibold">Terms & Conditions</span>
                </div>
                {/* <ChevronDown className="h-5 w-5 text-teal-400 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="space-y-4 bg-gradient-to-r from-slate-50 to-teal-50/30 p-4 rounded-lg">
                  <p className="text-slate-700 font-medium">
                    By submitting this application, you acknowledge and agree to the following terms:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'All information provided is accurate and complete',
                      'You authorize us to verify your information',
                      'You understand this is an application and not a guarantee of approval',
                      'You agree to our privacy policy and terms of service'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600">
                        <div className="p-1 mt-0.5 rounded-full bg-gradient-to-br from-teal-100 to-green-100">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex justify-between gap-4 pt-6">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="min-w-[120px] border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
      >
        Back
      </Button>
      <Button 
        onClick={onSubmit}
        className="min-w-[160px] bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all"
      >
        Submit Application
      </Button>
    </CardFooter>
  </Card>
);

export default ReviewApplication;