'use client';

import { store } from '@/src/service/store/store';
import { Provider } from 'react-redux';
import { ToastProvider } from './toast-provider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider />
            {children}
        </Provider>
    );
}