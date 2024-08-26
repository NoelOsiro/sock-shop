import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from 'lucide-react'
import { NavLinks } from "@/components/nav-links"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from '@/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sock Shop',
  description: 'The best socks in town!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">Sock Shop</Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <NavLinks />
                </nav>
                
                <div className="hidden md:flex items-center space-x-4">
                  <form className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </form>
                  <Link href="/cart" aria-label="Shopping cart">
                    <ShoppingCart className="h-6 w-6" />
                  </Link>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className='text-lg'>Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className='text-lg'>Sign Up</Button>
                  </Link>
                  <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <MobileNav />
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t">
            <div className="container mx-auto px-4 py-6 text-center">
              © 2023 Sock Shop. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}