"use client"
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, Camera, FileText, Upload } from "lucide-react";
import { Label } from "../ui/label";

interface Document
{
    file: File | null;
    preview: string | null;
    error?: string;
}

interface Documents
{
    idFront: Document;
    idBack: Document;
    selfie: Document;
}

interface Step
{
    title: string;
    description: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const KYCVerification = () =>
{
    const [verificationStep, setVerificationStep] = useState<number>(1);
    const [documents, setDocuments] = useState<Documents>({
        idFront: { file: null, preview: null },
        idBack: { file: null, preview: null },
        selfie: { file: null, preview: null }
    });

    const steps: Step[] = [
        { title: 'ID Verification', description: 'Upload your government-issued ID' },
        { title: 'Selfie Verification', description: 'Take a clear photo of yourself' },
        { title: 'Review', description: 'Review your submission' }
    ];

    const validateFile = (file: File): string | null =>
    {
        if (!ALLOWED_FILE_TYPES.includes(file.type))
        {
            return 'File type not supported. Please upload a JPG or PNG image.';
        }
        if (file.size > MAX_FILE_SIZE)
        {
            return 'File size exceeds 5MB limit.';
        }
        return null;
    };

    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        documentType: keyof Documents
    ) =>
    {
        const file = e.target.files?.[0];
        if (!file) return;

        const error = validateFile(file);
        const preview = error ? null : URL.createObjectURL(file);

        setDocuments(prev => ({
            ...prev,
            [documentType]: {
                file,
                preview,
                error
            }
        }));

        // Cleanup preview URL when component unmounts
        if (preview)
        {
            return () => URL.revokeObjectURL(preview);
        }
    };

    const isStepComplete = (): boolean =>
    {
        switch (verificationStep)
        {
            case 1:
                return !documents.idFront.error &&
                    !documents.idBack.error &&
                    documents.idFront.file !== null &&
                    documents.idBack.file !== null;
            case 2:
                return !documents.selfie.error && documents.selfie.file !== null;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const handleSubmit = async () =>
    {
        try
        {
            // Create FormData for file upload
            const formData = new FormData();
            Object.entries(documents).forEach(([key, doc]) =>
            {
                if (doc.file)
                {
                    formData.append(key, doc.file);
                }
            });

            // TODO: Replace with your actual API endpoint
            // const response = await fetch('/api/kyc/verify', {
            //   method: 'POST',
            //   body: formData
            // });

            console.log('Submitting verification:', formData);
        } catch (error)
        {
            console.error('Error submitting verification:', error);
        }
    };

    const renderFileUpload = (
        documentType: keyof Documents,
        label: string
    ) => (
        <div>
            <Label>{label}</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center relative cursor-pointer">
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    onChange={(e) => handleFileChange(e, documentType)}
                    aria-label={`Upload ${label}`}
                />
                {documents[documentType].preview ? (
                    <div className="relative">
                        <img
                            src={documents[documentType].preview!}
                            alt={label}
                            className="max-h-32 mx-auto object-contain"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            {documents[documentType].file?.name}
                        </p>
                    </div>
                ) : (
                    <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2">Drop your file here or click to browse</p>
                        <p className="text-sm text-gray-500 mt-1">
                            JPG or PNG, max 5MB
                        </p>
                    </>
                )}
                {documents[documentType].error && (
                    <p className="text-red-500 text-sm mt-2">
                        {documents[documentType].error}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>Complete KYC verification to unlock all features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Progress Indicator */}
                <div className="space-y-2">
                    <Progress value={(verificationStep / steps.length) * 100} className="h-2" />
                    <div className="flex justify-between text-sm">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center space-x-1 ${index + 1 <= verificationStep ? 'text-primary' : 'text-gray-400'
                                    }`}
                            >
                                <span className="font-medium">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                {verificationStep === 1 && (
                    <div className="space-y-4">
                        <Alert>
                            <FileText className="h-4 w-4" />
                            <AlertTitle>Document Requirements</AlertTitle>
                            <AlertDescription>
                                Please ensure your ID is:
                                <ul className="list-disc ml-4 mt-2">
                                    <li>Current and not expired</li>
                                    <li>Clearly visible and not blurry</li>
                                    <li>Shows all corners of the document</li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        <div className="grid md:grid-cols-2 gap-4">
                            {renderFileUpload('idFront', 'Front of ID')}
                            {renderFileUpload('idBack', 'Back of ID')}
                        </div>
                    </div>
                )}

                {verificationStep === 2 && (
                    <div className="space-y-4">
                        <Alert>
                            <Camera className="h-4 w-4" />
                            <AlertTitle>Selfie Requirements</AlertTitle>
                            <AlertDescription>
                                Please ensure your selfie:
                                <ul className="list-disc ml-4 mt-2">
                                    <li>Shows your full face clearly</li>
                                    <li>Is taken in good lighting</li>
                                    <li>Matches your ID photo</li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        {renderFileUpload('selfie', 'Take a Selfie')}
                    </div>
                )}

                {verificationStep === 3 && (
                    <div className="space-y-4">
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Final Review</AlertTitle>
                            <AlertDescription>
                                Please review your submitted documents carefully. Once submitted, you cannot make changes.
                            </AlertDescription>
                        </Alert>

                        <div className="grid md:grid-cols-3 gap-4">
                            {Object.entries(documents).map(([key, doc]) => (
                                <div key={key} className="p-4 border rounded">
                                    <p className="font-medium">{key}</p>
                                    {doc.preview ? (
                                        <div className="mt-2">
                                            <img
                                                src={doc.preview}
                                                alt={key}
                                                className="max-h-32 mx-auto object-contain"
                                            />
                                            <p className="text-sm text-gray-500 mt-2">{doc.file?.name}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No file selected</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => setVerificationStep(Math.max(1, verificationStep - 1))}
                        disabled={verificationStep === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() =>
                        {
                            if (verificationStep < steps.length)
                            {
                                setVerificationStep(verificationStep + 1);
                            } else
                            {
                                handleSubmit();
                            }
                        }}
                        disabled={!isStepComplete()}
                    >
                        {verificationStep === steps.length ? 'Submit Verification' : 'Continue'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default KYCVerification;