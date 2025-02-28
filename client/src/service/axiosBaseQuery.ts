"use client"

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from './axios';

export interface AxiosBaseQueryError {
    status?: number;
    data?: any;
}

interface CustomRequestConfig {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    skipAuth?: boolean;  // Add skipAuth option
}

export const axiosBaseQuery = (): BaseQueryFn<
    CustomRequestConfig,
    unknown,
    AxiosBaseQueryError
> =>
    async ({ url, method, data, params, headers, skipAuth }) => {
        try {
            const result = await axios({
                url,
                method,
                data,
                params,
                headers: {
                    ...headers,
                    ...(skipAuth ? { Authorization: undefined } : {}),
                },
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError<any>;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || {
                        error: 'An unexpected error occurred'
                    }
                },
            };
        }
    };