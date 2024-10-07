// PaymentDetailsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentDetailsForm from '../components/PaymentDetailsForm';

describe('PaymentDetailsForm', () => {
    const total = 100;

    test('renders M-pesa payment form', () => {
        render(<PaymentDetailsForm paymentMethod="mpesa" total={total} />);
        expect(screen.getByText('M-pesa Details')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('M-Pesa Number')).toBeInTheDocument();
        expect(screen.getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
    });

    test('renders Airtel payment form', () => {
        render(<PaymentDetailsForm paymentMethod="airtel" total={total} />);
        expect(screen.getByText('Airtel Money')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Airtel Number')).toBeInTheDocument();
        expect(screen.getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
    });

    test('renders SasaPay payment form', () => {
        render(<PaymentDetailsForm paymentMethod="sasapay" total={total} />);
        expect(screen.getByText('SasaPay Account')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('SasaPay Account')).toBeInTheDocument();
        expect(screen.getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
    });

    test('renders PayPal payment form', () => {
        render(<PaymentDetailsForm paymentMethod="paypal" total={total} />);
        expect(screen.getByText('PayPal Details')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PayPal EHandCoins')).toBeInTheDocument();
        expect(screen.getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
    });

    test('renders Visa payment form', () => {
        render(<PaymentDetailsForm paymentMethod="visa" total={total} />);
        expect(screen.getByText('Visa Card Details')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Expiry Date')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
    });

    test('handles payment button click', () => {
        window.alert = jest.fn(); // Mock the alert function
        render(<PaymentDetailsForm paymentMethod="mpesa" total={total} />);
        const button = screen.getByText('Pay');
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalled();
    });
});