// Common response types
export interface ErrorResponse {
    error: string;
}

export interface SuccessResponse {
    message: string;
}

// User related types
export interface User {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
    role: 'user' | 'admin';
    created_at: string;
    profile?: Profile;
    credit_cards?: CreditCard[];
}

// Auth request types
export interface SignupRequest {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    terms_accepted: boolean;
}

export interface SignupResponse {
    access: string;
    refresh?: string;
    user: User;
    message: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    access: string;
    refresh?: string;
    user: User;
    warning?: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface ResendVerificationResponse {
    status: string;
    message: string;
}

export interface RequestPasswordResetRequest {
    email: string;
}

export interface RequestPasswordResetResponse {
    message: string;
    reset_password_token: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    new_password: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

export interface TokenRefreshRequest {
    access_token: string;
}

export interface TokenRefreshResponse {
    access: string;
}

// Profile types
export interface Address {
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface Profile {
    phone_number: string;
    date_of_birth: string;
    monthly_income: number;
    employment_status: 'employed' | 'self_employed' | 'unemployed' | 'retired';
    employer_name?: string;
    job_title?: string;
    address: Address;
}

export interface CreateProfileRequest extends Profile { }

export interface UpdateProfileRequest extends Partial<Profile> { }

export interface ProfileResponse {
    profile: Profile;
    message: string;
}

// Credit card types
export interface CreditCard {
    id: string;
    card_type: 'visa' | 'mastercard' | 'amex';
    masked_card_number: string;
    expiry_month: number;
    expiry_year: number;
    name_on_card: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export interface AddCreditCardRequest {
    card_type: 'visa' | 'mastercard' | 'amex';
    card_number: string;
    cvc: string;
    expiry_month: number;
    expiry_year: number;
    name_on_card: string;
}

// Admin types
export interface UpdateUserRoleRequest {
    email: string;
    role: 'user' | 'admin';
}

export interface DeleteUserRequest {
    email: string;
}

export interface GetUserRequest {
    email: string;
}

export interface GetAllUsersResponse {
    count: number;
    users: User[];
}

// API Error type
export interface ApiError {
    message: string;
    status: number;
}