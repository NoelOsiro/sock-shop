import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { NavLinks } from '@/components/nav-links';

// Mock next/router if needed
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NavLinks', () => {
  it('renders navigation links correctly', () => {
    render(<NavLinks />);

    // Check if all links are rendered
    const menLink = screen.getByTestId('men-link');
    const womenLink = screen.getByTestId('women-link')
    const childrenLink = screen.getByTestId('children-link');

    expect(menLink).toBeInTheDocument();
    expect(womenLink).toBeInTheDocument();
    expect(childrenLink).toBeInTheDocument();
  });

  it('has correct href attributes', () => {
    render(<NavLinks />);

    // Check href for Men
    const menLink = screen.getByTestId('men-link');
    expect(menLink).toHaveAttribute('href', '/men');

    // Check href for Women
    const womenLink = screen.getByTestId('women-link')
    expect(womenLink).toHaveAttribute('href', '/women');

    // Check href for Children
    const childrenLink = screen.getByTestId('children-link');
    expect(childrenLink).toHaveAttribute('href', '/children');
  });
});
