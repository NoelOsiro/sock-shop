// ShippingForm.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Define the structure of the form data
interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

// Define the props for the ShippingForm component
interface ShippingFormProps {
  onComplete: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = (): Partial<Record<keyof FormData, string>> => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.fullName) newErrors.fullName = "Full Name is required."
    if (!formData.email) newErrors.email = "Email is required."
    if (!formData.address) newErrors.address = "Address is required."
    if (!formData.city) newErrors.city = "City is required."
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required."
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required."
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSubmitting(true)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="fullName"
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className={errors.fullName ? 'border-red-500' : ''}
      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      
      <Input
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className={errors.email ? 'border-red-500' : ''}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      
      <Input
        name="address"
        type="text"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        className={errors.address ? 'border-red-500' : ''}
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      
      <Input
        name="city"
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className={errors.city ? 'border-red-500' : ''}
      />
      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      
      <Input
        name="postalCode"
        type="text"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        className={errors.postalCode ? 'border-red-500' : ''}
      />
      {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
      
      <Input
        name="phoneNumber"
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className={errors.phoneNumber ? 'border-red-500' : ''}
      />
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Continue to Payment
      </Button>
    </form>
  )
}

export default ShippingForm
