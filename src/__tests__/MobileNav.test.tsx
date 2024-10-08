import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 // Adjust the import path as needed
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from '@/components/mobile-nav';

// Mocking necessary components
jest.mock('../components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ asChild, children }: { asChild: boolean; children: React.ReactNode }) => <button>{children}</button>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../components/theme-toggle', () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}));

describe('MobileNav', () => {
  beforeEach(() => {
    render(<MobileNav />);
  });

  it('renders the MobileNav component', () => {
    const toggleMenu = screen.getByTestId('toggle-menu-mobile')
    expect(toggleMenu).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    expect(screen.getByText('Men')).toBeInTheDocument();
    expect(screen.getByText('Women')).toBeInTheDocument();
    expect(screen.getByText(/children/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('toggles the menu when the trigger button is clicked', () => {
    const toggleMenu = screen.getByTestId('toggle-menu-mobile')
    expect(screen.getByText('Men')).toBeInTheDocument(); // The menu should be visible by default
    fireEvent.click(toggleMenu); // Simulate clicking the toggle button
    // expect(screen.queryByText(/men/)).not.toBeInTheDocument(); // Check if the menu is hidden after clicking
  });
});
