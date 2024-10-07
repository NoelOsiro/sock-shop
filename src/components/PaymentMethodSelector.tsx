// PaymentMethodSelector.tsx

"use client"

import { SetStateAction, useState } from "react"

type PaymentMethod = "mpesa" | "airtel" | "sasapay" | "paypal" | "visa";
import PaymentDetailsForm from "./PaymentDetailsForm"
import { useCart } from "@/contexts/CatrContext";

  
const PaymentMethodSelector = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("")
  const { cart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  const handlePaymentMethodChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPaymentMethod(event.target.value as PaymentMethod)
  }

  return (
    <div className="flex">
      <div className="w-2/5 border-r pr-2 lg:pr-4">
        <h3 className="text-md md:text-lg font-semibold mb-2">Payment Method</h3>
        <div>
          <input
            type="radio"
            id="mpesa"
            name="paymentMethod"
            value="mpesa"
            checked={paymentMethod === "mpesa"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="mpesa" className="ml-2">M-Pesa</label>
        </div>
        <div>
          <input
            type="radio"
            id="airtel"
            name="paymentMethod"
            value="airtel"
            checked={paymentMethod === "airtel"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="airtel" className="ml-2">Airtel Money</label>
        </div>
        <div>
          <input
            type="radio"
            id="sasapay"
            name="paymentMethod"
            value="sasapay"
            checked={paymentMethod === "sasapay"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="sasapay" className="ml-2">SasaPay</label>
        </div>
        <div>
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="paypal" className="ml-2">PayPal</label>
        </div>
        <div>
          <input
            type="radio"
            id="visa"
            name="paymentMethod"
            value="visa"
            checked={paymentMethod === "visa"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="visa" className="ml-2">Visa</label>
        </div>
      </div>
      <div className="w-3/5  pl-2 lg:pl-4">
        {paymentMethod && (
          <PaymentDetailsForm paymentMethod={paymentMethod} total={total} />
        )}
      </div>
    </div>
  )
}

export default PaymentMethodSelector
