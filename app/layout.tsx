import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import './global.css'
import { Metadata } from "next"
import { dark } from "@clerk/themes"
import {
  ClerkProvider,
} from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Your go-to collaborative editor',
  icons:{
    icon:'/assets/icons/logo-icon.svg'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: "#3371FF" ,
          fontSize: '12px',
          colorBackground: "#0B1527"
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-dark-100",
            fontSans.variable
          )}
        >
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}