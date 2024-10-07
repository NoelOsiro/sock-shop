import { CartIcon } from '@/components/CartIcon';
import { useCart } from '../contexts/CatrContext';
import { render, screen } from '@testing-library/react';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Mock the useCart hook
jest.mock('../contexts/CatrContext', () => ({
    useCart: jest.fn(),
}));

describe('CartIcon', () => {
    it('renders the shopping cart icon', () => {
        (useCart as jest.Mock).mockReturnValue({ cart: [] });

        render(<CartIcon />);

        // Check that the cart link exists
        expect(screen.getByRole('link')).toHaveAttribute('href', '/cart');

        // Check for the presence of the SVG using its class
        expect(screen.getByRole('link').querySelector('svg')).toHaveClass('lucide-shopping-cart');
    });

    it('shows the item count when there are items in the cart', () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [
                { id: 1, quantity: 2 },
                { id: 2, quantity: 3 },
            ],
        });

        render(<CartIcon />);

        expect(screen.getByText('5')).toBeInTheDocument();
    });
    it('shows the item count when there are items in the cart', () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [
                { id: 1, quantity: 2 },
                { id: 2, quantity: 3 },
            ],
        });

        render(<CartIcon />);

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('does not show the item count when the cart is empty', () => {
        (useCart as jest.Mock).mockReturnValue({ cart: [] });

        render(<CartIcon />);

        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
});