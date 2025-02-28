import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/';

export interface ApiError {
    message: string;
    status: number;
}

interface DjangoErrorResponse {
    error: string;
}

// Define public endpoints that don't need authentication
const publicEndpoints = [
    '/',
    '/users/signup/',
    '/users/login/',
    '/users/verify-email/',
    '/users/resend-verification/',
    '/users/request-password-reset/',
    '/users/reset-password/',
];

const isPublicEndpoint = (url: string) => {
    return publicEndpoints.some(endpoint => url.includes(endpoint));
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Skip auth token for public endpoints
        if (!isPublicEndpoint(config.url || '')) {
            const token = Cookies.get('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Skip token refresh for public endpoints
        if (!isPublicEndpoint(originalRequest.url || '') &&
            error.response?.status === 401 &&
            !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
                    access_token: Cookies.get('access_token'),
                });

                const { access } = response.data;
                Cookies.set('access_token', access, { secure: true, sameSite: 'strict' });

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                Cookies.remove('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Error handling based on status codes
        const errorData = error.response?.data as DjangoErrorResponse;
        const apiError: ApiError = {
            message: errorData?.error || getErrorMessage(error.response?.status),
            status: error.response?.status || 500,
        };

        return Promise.reject(apiError);
    }
);

// Helper function to get error messages based on status codes
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as InternalAxiosRequestConfig & {
//             _retry?: boolean;
//             _retryCount?: number;
//         };

//         // If user is not logged in (no tokens), redirect to login
//         if (!Cookies.get('access_token') && !Cookies.get('refresh_token')) {
//             window.location.href = '/login';
//             return Promise.reject(error);
//         }

//         // Handle token refresh
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Get both tokens
//                 const accessToken = Cookies.get('access_token');
//                 const refreshToken = Cookies.get('refresh_token');

//                 if (!accessToken || !refreshToken) {
//                     throw new Error('Missing tokens');
//                 }

//                 // Try to refresh token
//                 const response = await axios.post(`${API_BASE_URL}users/token/refresh/`, {
//                     access_token: accessToken,
//                     refresh_token: refreshToken
//                 });

//                 if (response.data.access) {
//                     // Update token in cookies
//                     Cookies.set('access_token', response.data.access, {
//                         secure: true,
//                         sameSite: 'strict'
//                     });

//                     // Update Authorization header
//                     originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

//                     // Retry original request
//                     return axiosInstance(originalRequest);
//                 }
//             } catch (refreshError) {
//                 // Clear tokens and redirect to login
//                 Cookies.remove('access_token');
//                 Cookies.remove('refresh_token');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

const getErrorMessage = (status?: number): string => {
    switch (status) {
        case 400:
            return 'Invalid request. Please check your data.';
        case 401:
            return 'Authentication required. Please log in.';
        case 403:
            return 'You do not have permission to perform this action.';
        case 404:
            return 'The requested resource was not found.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'Server error. Please try again later.';
        case 503:
            return 'Service temporarily unavailable. Please try again later.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
};

export default axiosInstance;