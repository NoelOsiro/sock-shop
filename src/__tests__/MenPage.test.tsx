import { render, screen, waitFor } from '@testing-library/react';
 // Adjust the import according to your file structure
import { getMensProducts } from '@/lib/api';
import { Product } from '@/lib/product';
import MenPage from '@/app/(site)/men/page';

// Mock the required modules
jest.mock('../lib/api', () => ({
    getMensProducts: jest.fn(),
}));

jest.mock('../components/ProductFilter', () => {
    return function MockProductFilter() {
        return <div>Mock Product Filter</div>;
    };
});

jest.mock('../components/ui/AnimatedProductCard', () => {
    return function MockAnimatedProductCard({ product }: { product: Product }) {
        console.log("Mocked AnimatedProductCard called with:", product);
        return <div>{product.title}</div>; // Assume products have a name
    };
});

// Define some mock products for testing
const mockProducts: Product[] = [
    {
        _id: '1',
        price: 20,
        isOnSale: true,
        variants: [
            { size: 'M', color: 'red', stock: 10, type: 'casual', material: 'cotton',title:'Red Casual Socks', price: 20 },
        ],
        title: 'Red Casual Socks',
        description: 'A pair of comfortable red socks',
        slug: { current: 'red-casual-socks' },
        imageUrl: '/images/socks/red-casual-socks.jpg',
        salePrice: 15,
        
    },
    {
        _id: '2',
        price: 30,
        isOnSale: false,
        variants: [
            { size: 'L', color: 'blue', stock: 5, type: 'formal', material: 'polyester',title:'Blue Formal Socks', price: 30 },
        ],
        title: 'Blue Formal Socks',
        description: 'A pair of formal blue socks',
        slug: { current: 'blue-formal-socks' },
        imageUrl: '/images/socks/blue-formal-socks.jpg',
        salePrice: null,
    },
];

describe('MenPage', () => {
    beforeEach(() => {
        (getMensProducts as jest.Mock).mockResolvedValue(mockProducts);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page title and product filter', async () => {
        render(<MenPage searchParams={{}} />); // Pass empty searchParams for initial test

        // Wait for the products to be loaded
        await waitFor(() => {
            expect(screen.getByText("Men's Socks")).toBeInTheDocument();
            expect(screen.getByText("Mock Product Filter")).toBeInTheDocument();
        });
    });

    it.only('displays the correct number of product cards', async () => {
        render(<MenPage searchParams={{color:"Black"}} />);

        await waitFor(() => {
            // Ensure that the product cards are displayed
            expect(screen.getByText('Red Casual Socks')).toBeInTheDocument();
            expect(screen.getByText('Blue Formal Socks')).toBeInTheDocument();
        });
    });

    it('handles empty product list gracefully', async () => {
        (getMensProducts as jest.Mock).mockResolvedValue([]);

        render(<MenPage searchParams={{}} />);

        await waitFor(() => {
            // Check for an indication that no products are available
            expect(screen.queryByText('Red Casual Socks')).not.toBeInTheDocument();
            expect(screen.queryByText('Blue Formal Socks')).not.toBeInTheDocument();
        });
    });

    // Additional tests for filtering functionality can go here
});
