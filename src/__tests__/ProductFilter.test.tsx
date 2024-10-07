import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductFilter, ProductFilterProps } from '../components/ProductFilter'; // Adjust the path as necessary


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe('ProductFilter', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({ push: mockPush });
        mockUseSearchParams.mockReturnValue(new URLSearchParams());
        
    });
    

    const filterSections: ProductFilterProps['filterSections'] = [
        {
            id: 'category',
            title: 'Category',
            type: 'checkbox',
            options: [
                { id: 'electronics', label: 'Electronics' },
                { id: 'clothing', label: 'Clothing' },
            ],
        },
        {
            id: 'price',
            title: 'Price Range',
            type: 'range',
            range: { min: 0, max: 1000, step: 10 },
        },
        {
            id: 'brand',
            title: 'Brand',
            type: 'radio',
            options: [
                { id: 'nike', label: 'Nike' },
                { id: 'adidas', label: 'Adidas' },
            ],
        },
    ];

    it('renders filter sections correctly', () => {
        render(<ProductFilter filterSections={filterSections} />);

        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('Price Range')).toBeInTheDocument();
        expect(screen.getByText('Brand')).toBeInTheDocument();
    });

    it('handles checkbox changes correctly', () => {
        render(<ProductFilter filterSections={filterSections} />);

        const electronicsBrand = screen.getByText('Category');
        fireEvent.click(electronicsBrand);

        const electronicsCheckbox = screen.getByLabelText('Electronics');
        fireEvent.click(electronicsCheckbox);

        expect(mockPush).toHaveBeenCalledWith('?category=electronics');
    });

    it('handles radio changes correctly', () => {
        render(<ProductFilter filterSections={filterSections} />);

        const brandRadio = screen.getByText('Brand');
        fireEvent.click(brandRadio);

        const nikeRadio = screen.getByLabelText('Nike');
        fireEvent.click(nikeRadio);

        expect(mockPush).toHaveBeenCalledWith('?brand=nike');
    });

    // it('handles range changes correctly', () => {
    //     render(<ProductFilter filterSections={filterSections} />);

    //     const priceRange = screen.getByText('Price Range');
    //     fireEvent.click(priceRange);

    //     const slider = screen.getByRole('slider');
    //     fireEvent.change(slider, { target: { value: [100, 500] } });

    //     expect(mockPush).toHaveBeenCalledWith('?price=100,500');
    // });

    it('clears filters correctly', () => {
        render(<ProductFilter filterSections={filterSections} />);

        const clearButton = screen.getByText('Clear Filters');
        fireEvent.click(clearButton);

        expect(mockPush).toHaveBeenCalledWith('?');
    });
});