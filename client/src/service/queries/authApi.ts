import { createApi } from '@reduxjs/toolkit/query/react';
import type {
    SignupRequest,
    SignupResponse,
    LoginRequest,
    LoginResponse,
    VerifyEmailRequest,
    ResendVerificationRequest,
    ResendVerificationResponse,
    RequestPasswordResetRequest,
    RequestPasswordResetResponse,
    ResetPasswordRequest,
    ChangePasswordRequest,
    TokenRefreshRequest,
    TokenRefreshResponse,
    CreateProfileRequest,
    UpdateProfileRequest,
    ProfileResponse,
    AddCreditCardRequest,
    CreditCard,
    User,
    SuccessResponse,
    UpdateUserRoleRequest,
    DeleteUserRequest,
    GetAllUsersResponse,
} from "../../types/auth";

import Cookies from 'js-cookie';
import { axiosBaseQuery } from '../axiosBaseQuery';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Profile', 'CreditCards', 'User'],
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (credentials) => ({
                url: 'users/signup/',
                method: 'POST',
                data: credentials,
                skipAuth: true
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    Cookies.set('access_token', data.access, { secure: true, sameSite: 'strict' });
                    // Cookies.set('refresh_token', data.refresh, { secure: true, sameSite: "strict" });
                } catch { } // Error handling in component
            },
        }),

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'users/login/',
                method: 'POST',
                data: credentials,
                skipAuth: true
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    Cookies.set('access_token', data.access, { secure: true, sameSite: 'strict' });
                    // Cookies.set('refresh_token', data.refresh, { secure: true, sameSite: 'strict' })
                } catch { } // Error handling in component
            },
        }),

        logout: builder.mutation<SuccessResponse, void>({
            query: () => ({
                url: 'users/logout/',
                method: 'POST',
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    Cookies.remove('access_token');
                } catch { } // Error handling in component
            },
        }),

        verifyEmail: builder.mutation<SuccessResponse, VerifyEmailRequest>({
            query: (data) => ({
                url: 'users/verify-email/',
                method: 'POST',
                data,
                skipAuth: true
            }),
        }),

        resendVerification: builder.mutation<ResendVerificationResponse, ResendVerificationRequest>({
            query: (data) => ({
                url: 'users/resend-verification/',
                method: 'POST',
                data,
                skipAuth: true
            }),
        }),

        requestPasswordReset: builder.mutation<RequestPasswordResetResponse, RequestPasswordResetRequest>({
            query: (data) => ({
                url: 'users/request-password-reset/',
                method: 'POST',
                data,
                skipAuth: true
            }),
        }),

        resetPassword: builder.mutation<SuccessResponse, ResetPasswordRequest>({
            query: (data) => ({
                url: 'users/reset-password/',
                method: 'POST',
                data,
                skipAuth: true
            }),
        }),

        changePassword: builder.mutation<SuccessResponse, ChangePasswordRequest>({
            query: (data) => ({
                url: 'users/change-password/',
                method: 'POST',
                data,
            }),
        }),

        refreshToken: builder.mutation<TokenRefreshResponse, TokenRefreshRequest>({
            query: (data) => ({
                url: 'users/token/refresh/',
                method: 'POST',
                data,
            }),
        }),

        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: 'users/profile/',
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),

        createProfile: builder.mutation<ProfileResponse, CreateProfileRequest>({
            query: (data) => ({
                url: 'users/profile/create/',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Profile'],
        }),

        updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
            query: (data) => ({
                url: 'users/profile/update/',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['Profile'],
        }),

        getCreditCards: builder.query<CreditCard[], void>({
            query: () => ({
                url: 'users/credit-cards/',
                method: 'GET',
            }),
            providesTags: ['CreditCards'],
        }),

        addCreditCard: builder.mutation<CreditCard, AddCreditCardRequest>({
            query: (data) => ({
                url: 'users/credit-cards/add/',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['CreditCards'],
        }),

        deleteCreditCard: builder.mutation<void, string>({
            query: (cardId) => ({
                url: `user/credit-cards/${cardId}/delete/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CreditCards'],
        }),

        setDefaultCard: builder.mutation<void, string>({
            query: (cardId) => ({
                url: `users/credit-cards/${cardId}/set-default/`,
                method: 'POST',
            }),
            invalidatesTags: ['CreditCards'],
        }),

        getUserDetails: builder.query<User, void>({
            query: () => ({
                url: 'users/me/',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        // getUserDetails: builder.query<User, void>({
        //     query: () => ({
        //         url: '/users/me/',
        //         method: 'GET',
        //     }),
        //     // Add this to prevent unnecessary retries
        //     extraOptions: {
        //         maxRetries: 1,
        //     },
        //     // Add proper error handling
        //     async onQueryStarted(_, { queryFulfilled }) {
        //         try {
        //             await queryFulfilled;
        //         } catch (error: any) {
        //             if (error?.error?.status === 401) {
        //                 Cookies.remove('access_token');
        //                 Cookies.remove('refresh_token');
        //                 window.location.href = '/login';
        //             }
        //         }
        //     },
        // }),

        getAllUsers: builder.query<GetAllUsersResponse, void>({
            query: () => ({
                url: 'users/admin/users/',
                method: 'GET',
            }),
        }),

        getSpecificUser: builder.query<User, number>({
            query: (userId) => ({
                url: `users/admin/users/${userId}/`,
                method: 'GET',
            }),
        }),

        updateUserRole: builder.mutation<User, UpdateUserRoleRequest>({
            query: (data) => ({
                url: 'users/admin/users/role/',
                method: 'PATCH',
                data,
            }),
        }),

        deleteUser: builder.mutation<void, DeleteUserRequest>({
            query: (data) => ({
                url: 'users/admin/users/delete/',
                method: 'DELETE',
                data,
            }),
        }),

        deleteAllUsers: builder.mutation<void, void>({
            query: () => ({
                url: 'user/admin/users/',
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useResendVerificationMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useRefreshTokenMutation,
    useGetProfileQuery,
    useCreateProfileMutation,
    useUpdateProfileMutation,
    useGetCreditCardsQuery,
    useAddCreditCardMutation,
    useDeleteCreditCardMutation,
    useSetDefaultCardMutation,
    useGetUserDetailsQuery,
    useGetAllUsersQuery,
    useGetSpecificUserQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
    useDeleteAllUsersMutation,
} = authApi;