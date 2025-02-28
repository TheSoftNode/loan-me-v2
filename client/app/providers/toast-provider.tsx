'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
        // toastOptions={{
        //     // Default options for specific types
        //     success: {
        //         duration: 3000,
        //         style: {
        //             background: '#22c55e',
        //             color: 'white',
        //         },
        //     },
        //     error: {
        //         duration: 4000,
        //         style: {
        //             background: '#ef4444',
        //             color: 'white',
        //         },
        //     },
        //     // Default options for all toasts
        //     style: {
        //         border: '1px solid #713200',
        //         padding: '16px',
        //         color: '#713200',
        //     },
        // }}
        />
    );
}