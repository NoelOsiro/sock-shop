"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
      )
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }
      return [...prevCart, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => (item.id === id ? { ...item, quantity: quantity } : item))
        .filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };
  

  const clearCart = () => {
    setCart([])
  }

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}