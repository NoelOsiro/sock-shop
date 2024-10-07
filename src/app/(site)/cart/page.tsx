"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CatrContext"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-primary hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center justify-between border-b pb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered entrance animation
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">Size: {item.size}, Color: {item.color}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16"
                  />
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <Link href="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
