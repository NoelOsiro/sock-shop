// PaymentDetailsForm.tsx

"use client"

import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { HandCoins } from "lucide-react";

// Define the props for the PaymentDetailsForm component
interface PaymentDetailsFormProps {
    paymentMethod: "mpesa" | "airtel" | "sasapay" | "paypal" | "visa";
    total: number;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ paymentMethod, total }) => {
    const handlePayment = () => {
        alert('Payment Successful')
    }
    return (
        <div>

            {paymentMethod === "mpesa" && (
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-lg font-semibold mb-2">M-pesa Details</h3>
                    <Input placeholder="M-Pesa Number" />
                    <p className="text-xl font-bold mt-4 mb-4">Total: ${total.toFixed(2)}</p>
                    <Button variant={'destructive'} onClick={handlePayment}>
                        <HandCoins className="mr-2 h-4 w-4" /> Pay
                    </Button>
                </div>
            )}
            {paymentMethod === "airtel" && (
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-lg font-semibold mb-2">Airtel Money</h3>
                    <Input placeholder="Airtel Number" />
                    <p className="text-xl font-bold mt-4 mb-4">Total: ${total.toFixed(2)}</p>
                    <Button variant={'destructive'} onClick={handlePayment}>
                        <HandCoins className="mr-2 h-4 w-4" /> Pay
                    </Button>

                </div>
            )}
            {paymentMethod === "sasapay" && (
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-lg font-semibold mb-2">SasaPay Account</h3>
                    <Input placeholder="SasaPay Account" />
                    <p className="text-xl font-bold mt-4 mb-4">Total: ${total.toFixed(2)}</p>
                    <Button variant={'destructive'} onClick={handlePayment}>
                        <HandCoins className="mr-2 h-4 w-4" /> Pay
                    </Button>

                </div>
            )}
            {paymentMethod === "paypal" && (
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-lg font-semibold mb-2">PayPal Details</h3>
                    <Input placeholder="PayPal EHandCoins" />
                    <p className="text-xl font-bold mt-4 mb-4">Total: ${total.toFixed(2)}</p>
                    <Button variant={'destructive'} onClick={handlePayment}>
                        <HandCoins className="mr-2 h-4 w-4" /> Pay
                    </Button>

                </div>
            )}
            {paymentMethod === "visa" && (
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-lg font-semibold mb-2">Visa Card Details</h3>
                    <Input placeholder="Card Number" />
                    <Input placeholder="Expiry Date" />
                    <Input placeholder="CVV" />
                </div>
            )}
        </div>
    )
}

export default PaymentDetailsForm
