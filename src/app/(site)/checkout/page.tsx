"use client"

import PaymentMethodSelector from "@/components/PaymentMethodSelector"
import ShippingForm from "@/components/ShippingForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CatrContext"
import Link from "next/link"
import { useState } from "react"


const Checkout = () => {
  const { cart, clearCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  const [isShippingComplete, setIsShippingComplete] = useState(false)

  const handleShippingComplete = () => {
    setIsShippingComplete(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-primary hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          <div className="space-y-6">
            <div className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <ShippingForm onComplete={handleShippingComplete} />
            </div>
            {isShippingComplete && (
              <div className="border p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <PaymentMethodSelector />
              </div>
            )}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <Button onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Checkout
