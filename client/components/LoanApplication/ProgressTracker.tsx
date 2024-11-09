import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps
{
    currentStep: number;
    steps: string[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, steps }) => (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
        <div className="flex flex-wrap justify-between items-center">
            {steps.map((label, index) => (
                <div key={label} className="flex items-center mb-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
            ${currentStep > index + 1 ? 'bg-green-600' :
                            currentStep === index + 1 ? 'bg-blue-600' : 'bg-gray-300'} 
            text-white font-medium`}>
                        {currentStep > index + 1 ? (
                            <CheckCircle2 className="h-5 w-5" />
                        ) : (
                            index + 1
                        )}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-600">{label}</div>
                    {index < steps.length - 1 && (
                        <div className={`hidden md:block h-0.5 w-12 mx-2 
              ${currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
                    )}
                </div>
            ))}
        </div>
    </div>
);
