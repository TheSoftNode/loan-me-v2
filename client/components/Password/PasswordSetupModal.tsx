import { useState, useMemo } from 'react';
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react';

interface PasswordSetupModalProps
{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface PasswordStrength
{
    score: number;
    requirements: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

interface ValidationState
{
    password: string;
    confirmPassword: string;
    hasPassword: boolean;
    hasConfirmPassword: boolean;
    passwordsMatch: boolean;
    meetsAllRequirements: boolean;
}

export const PasswordSetupModal = ({ isOpen, onClose, onSuccess }: PasswordSetupModalProps) =>
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
        score: 0,
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    const validation = useMemo((): ValidationState =>
    {
        return {
            password,
            confirmPassword,
            hasPassword: password.length > 0,
            hasConfirmPassword: confirmPassword.length > 0,
            passwordsMatch: password === confirmPassword,
            meetsAllRequirements: passwordStrength.score === 5
        };
    }, [password, confirmPassword, passwordStrength.score]);

    const isSubmitDisabled = useMemo(() =>
    {
        return !validation.hasPassword ||
            !validation.hasConfirmPassword ||
            !validation.passwordsMatch ||
            !validation.meetsAllRequirements ||
            isLoading;
    }, [validation, isLoading]);

    const checkPasswordStrength = (value: string) =>
    {
        const requirements = {
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        setPasswordStrength({ score, requirements });
        return score;
    };

    const getPasswordStrengthColor = () =>
    {
        if (passwordStrength.score === 5)
        {
            return 'bg-green-500';
        }
        const colors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-yellow-500'];
        return colors[passwordStrength.score] || colors[0];
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value;
        setPassword(value);
        checkPasswordStrength(value);
        setError('');

        if (confirmPassword && value !== confirmPassword)
        {
            setError('Passwords do not match');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value !== password)
        {
            setError('Passwords do not match');
        } else
        {
            setError('');
        }
    };

    const handleBlur = (field: 'password' | 'confirmPassword') =>
    {
        setTouched(prev => ({ ...prev, [field]: true }));
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100 w-full max-w-md">
                <h2 className="text-2xl font-bold text-teal-600 mb-6">Set Up Password</h2>

                <p className="text-slate-600 text-sm mb-6">
                    Setting up a password will allow you to sign in using your email address
                    in addition to Google Sign-In.
                </p>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-slate-600 text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={() => handleBlur('password')}
                                className={`w-full bg-slate-50 border rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 ${touched.password && !validation.hasPassword
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-slate-200 focus:border-teal-400 focus:ring-teal-400'
                                    }`}
                                placeholder="Enter password"
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {touched.password && !validation.hasPassword && (
                            <p className="text-red-500 text-xs mt-1">Password is required</p>
                        )}

                        {password && (
                            <div className="space-y-2">
                                <div className="flex space-x-1 h-1">
                                    {[...Array(5)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-full w-full rounded-full ${index < passwordStrength.score
                                                ? getPasswordStrengthColor()
                                                : 'bg-slate-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {Object.entries(passwordStrength.requirements).map(([key, met]) => (
                                        <div
                                            key={key}
                                            className={`flex items-center space-x-1 ${met ? 'text-green-500' : 'text-slate-400'
                                                }`}
                                        >
                                            {met ? (
                                                <Check className="h-3 w-3" />
                                            ) : (
                                                <X className="h-3 w-3" />
                                            )}
                                            <span>
                                                {key === 'length'
                                                    ? '8+ characters'
                                                    : key === 'uppercase'
                                                        ? 'Uppercase'
                                                        : key === 'lowercase'
                                                            ? 'Lowercase'
                                                            : key === 'number'
                                                                ? 'Number'
                                                                : 'Special char'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-600 text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onBlur={() => handleBlur('confirmPassword')}
                                className={`w-full bg-slate-50 border rounded-lg px-4 py-2 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 ${touched.confirmPassword && !validation.hasConfirmPassword
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-slate-200 focus:border-teal-400 focus:ring-teal-400'
                                    }`}
                                placeholder="Confirm password"
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {touched.confirmPassword && !validation.hasConfirmPassword && (
                            <p className="text-red-500 text-xs mt-1">Confirm password is required</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
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
                            className={`text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[120px] ${isSubmitDisabled
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-teal-500 hover:bg-teal-600'
                                }`}
                            disabled={isSubmitDisabled}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Set Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordSetupModal;