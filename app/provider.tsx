// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import LoginContextProvider from "@/app/store/login-context";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <LoginContextProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </LoginContextProvider>
    )
}