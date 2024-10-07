import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Facebook, Twitter, Instagram } from 'lucide-react'
import { NavLinks } from "@/components/nav-links"
import { MobileNav } from "@/components/mobile-nav"
import { CartProvider } from '@/contexts/CatrContext'
import { ThemeToggle } from '@/components/theme-toggle'
import { CartIcon } from '@/components/CartIcon'

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
      <body className={`${inter.className} flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg bg-cover bg-center`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <header className="border-b">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold">Sock Shop</Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-4">
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
                    <CartIcon />
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                    <ThemeToggle />
                  </div>

                  {/* Mobile Navigation */}
                  <MobileNav />
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shop</h2>
                  <ul className="space-y-2">
                    <li><Link href="/men" className="hover:underline">Men&apos;s Socks</Link></li>
                    <li><Link href="/women" className="hover:underline">Women&apos;s Socks</Link></li>
                    <li><Link href="/children" className="hover:underline">Children&apos;s Socks</Link></li>
                    <li><Link href="/sale" className="hover:underline">Sale</Link></li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Company</h2>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="hover:underline">About Us</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                    <li><Link href="/press" className="hover:underline">Press</Link></li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
                  <ul className="space-y-2">
                    <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                    <li><Link href="/shipping" className="hover:underline">Shipping</Link></li>
                    <li><Link href="/returns" className="hover:underline">Returns</Link></li>
                    <li><Link href="/size-guide" className="hover:underline">Size Guide</Link></li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
                  <p className="mb-4">Stay up to date with our latest offers and news</p>
                  <form className="flex">
                    <Input type="email" placeholder="Your email" className="rounded-r-none" />
                    <Button type="submit" className="rounded-l-none">Subscribe</Button>
                  </form>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © 2024 Sock Shop. All rights reserved.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <Instagram className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}