// ShippingForm.test.tsx

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import ShippingForm from '@/components/ShippingForm'

describe('ShippingForm', () => {
    const onComplete = jest.fn()

    beforeEach(() => {
        render(<ShippingForm onComplete={onComplete} />)
    })

    test('renders all input fields and the submit button', () => {
        expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Shipping Address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('City')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Postal Code')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument()
        expect(screen.getByText('Continue to Payment')).toBeInTheDocument()
    })

    test('shows validation errors when submitting empty form', () => {
        fireEvent.click(screen.getByText('Continue to Payment'))

        expect(screen.getByText('Full Name is required.')).toBeInTheDocument()
        expect(screen.getByText('Email is required.')).toBeInTheDocument()
        expect(screen.getByText('Address is required.')).toBeInTheDocument()
        expect(screen.getByText('City is required.')).toBeInTheDocument()
        expect(screen.getByText('Postal Code is required.')).toBeInTheDocument()
        expect(screen.getByText('Phone Number is required.')).toBeInTheDocument()
    })

    test('calls onComplete when form is valid and submitted', () => {
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Shipping Address'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Anytown' } })
        fireEvent.change(screen.getByPlaceholderText('Postal Code'), { target: { value: '12345' } })
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '555-555-5555' } })

        fireEvent.click(screen.getByText('Continue to Payment'))

        expect(onComplete).toHaveBeenCalled()
    })

    test('disables submit button when form is submitting', () => {
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Shipping Address'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Anytown' } })
        fireEvent.change(screen.getByPlaceholderText('Postal Code'), { target: { value: '12345' } })
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '555-555-5555' } })

        fireEvent.click(screen.getByText('Continue to Payment'))

        expect(screen.getByText('Continue to Payment')).toBeDisabled()
    })
})