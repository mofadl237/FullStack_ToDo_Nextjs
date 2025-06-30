

import { type Metadata } from 'next'
import {
  ClerkProvider,
  RedirectToSignIn,
  
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ModeToggle } from '@/components/DarkMode'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ToDo FullStack',
  description: 'Generated Todo For Tasks',
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
          <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SignedIn>
                <header className="container mx-auto">
                  <div className="flex justify-between items-center p-4 gap-4 h-16">
                    <ModeToggle />
                    <UserButton />
                  </div>
                </header>
                {children}
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </ThemeProvider>
          </ClerkProvider>
        ) : (
          <>{children}</> 
        )}
      </body>
    </html>
  )
}

