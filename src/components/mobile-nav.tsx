"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only" data-testid="toggle-menu-mobile">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4">
          <Link 
            href="/men" 
            className="block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
                       hover:bg-primary hover:text-primary-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       dark:focus:ring-offset-gray-900"
          >
            Men
          </Link>
          <Link 
            href="/women" 
            className="block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
                       hover:bg-primary hover:text-primary-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       dark:focus:ring-offset-gray-900"
          >
            Women
          </Link>
          <Link 
            href="/children" 
            className="block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
                       hover:bg-primary hover:text-primary-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       dark:focus:ring-offset-gray-900"
          >
            Children
          </Link>
          <form className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>
          <Link href="/cart" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span>Cart</span>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="w-full justify-start">Login</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="w-full justify-start">Sign Up</Button>
          </Link>
          <ThemeToggle />
        </nav>
      </SheetContent>
    </Sheet>
  )
}