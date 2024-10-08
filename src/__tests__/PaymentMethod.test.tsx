import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import { CartProvider } from '@/contexts/CatrContext';
import { fireEvent, render, screen } from '@testing-library/react';


describe('PaymentMethodSelector', () => {
  const mockCart = [
    { id: 1, name: 'Item 1', price: 100, quantity: 2 },
    { id: 2, name: 'Item 2', price: 200, quantity: 1 },
  ];

  const MockCartProvider = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>
      {children}
    </CartProvider>
    );

  it('renders payment method options and handles selection', () => {
    render(
      <MockCartProvider>
        <PaymentMethodSelector />
      </MockCartProvider>
    );

    // Check that all payment options are rendered
    const mpesa = screen.getByLabelText('M-Pesa');
    const airtel = screen.getByLabelText('Airtel Money');
    const sasapay = screen.getByLabelText('SasaPay');
    const paypal = screen.getByLabelText('PayPal');
    const visa = screen.getByLabelText('Visa');

    expect(mpesa).toBeInTheDocument();
    expect(airtel).toBeInTheDocument();
    expect(sasapay).toBeInTheDocument();
    expect(paypal).toBeInTheDocument();
    expect(visa).toBeInTheDocument();

    // Simulate selecting a payment method
    fireEvent.click(mpesa);
    expect(mpesa).toBeChecked();
    fireEvent.click(airtel);
    expect(airtel).toBeChecked();
  });

  it('displays the PaymentDetailsForm component when a payment method is selected', () => {
    render(
      <MockCartProvider>
        <PaymentMethodSelector />
      </MockCartProvider>
    );

    // Initially, PaymentDetailsForm should not be rendered
    expect(screen.queryByText(/Payment Details/)).not.toBeInTheDocument();

    // Select a payment method
    const mpesa = screen.getByLabelText('M-Pesa');
    fireEvent.click(mpesa);

    // Now PaymentDetailsForm should be visible
    expect(screen.getByText(/M-pesa Details/)).toBeInTheDocument();
  });
  it('displays the PaymentDetailsForm component Paypal when a payment method is selected', () => {
    render(
      <MockCartProvider>
        <PaymentMethodSelector />
      </MockCartProvider>
    );

    // Initially, PaymentDetailsForm should not be rendered
    expect(screen.queryByText(/Payment Details/)).not.toBeInTheDocument();

    // Select a payment method
    const mpesa = screen.getByLabelText('PayPal');
    fireEvent.click(mpesa);

    // Now PaymentDetailsForm should be visible
    expect(screen.getByText(/PayPal Details/)).toBeInTheDocument();
  });

  it('displays the PaymentDetailsForm component SasaPay when a payment method is selected', () => {
    render(
      <MockCartProvider>
        <PaymentMethodSelector />
      </MockCartProvider>
    );

    // Initially, PaymentDetailsForm should not be rendered
    expect(screen.queryByText(/Payment Details/)).not.toBeInTheDocument();

    // Select a payment method
    const mpesa = screen.getByLabelText('SasaPay');
    fireEvent.click(mpesa);

    // Now PaymentDetailsForm should be visible
    expect(screen.getByText(/SasaPay Account/)).toBeInTheDocument();
  });
  
  it('displays the PaymentDetailsForm component Visa when a payment method is selected', () => {
    render(
      <MockCartProvider>
        <PaymentMethodSelector />
      </MockCartProvider>
    );

    // Initially, PaymentDetailsForm should not be rendered
    expect(screen.queryByText(/Visa Details/)).not.toBeInTheDocument();

    // Select a payment method
    const mpesa = screen.getByLabelText('Visa');
    fireEvent.click(mpesa);

    // Now PaymentDetailsForm should be visible
    expect(screen.getByText(/Visa Card Details/)).toBeInTheDocument();
  });
});
