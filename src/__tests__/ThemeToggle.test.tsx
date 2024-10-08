import { ThemeToggle } from '@/components/theme-toggle';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
// jest.setup.js
import '@testing-library/jest-dom';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('dark'), // You can adjust this to return true if you want to simulate dark mode
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });



// Helper function to wrap components in the ThemeProvider
const renderWithThemeProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider attribute="class">{ui}</ThemeProvider>);
};

describe('ThemeToggle component', () => {
  it('renders the theme toggle button', () => {
    renderWithThemeProvider(<ThemeToggle />);
    
    const button = screen.getByTestId('theme-toggle');
    expect(button).toBeInTheDocument();
  });

//   it('should switch to light theme when Light is clicked', async () => {
//     renderWithThemeProvider(<ThemeToggle />);
    
//     // Open the dropdown
//     const button = screen.getByTestId('theme-toggle');
//     fireEvent.click(button);
    
//     // Wait for the "Light" option to appear in the DOM
//     const lightOption = await screen.findByText('Light');
//     fireEvent.click(lightOption);
    
//     // Assert that the theme was set to light
//     expect(document.documentElement).toHaveClass('light');
//   });

//   it('should switch to dark theme when Dark is clicked', () => {
//     renderWithThemeProvider(<ThemeToggle />);
    
//     // Open the dropdown
//     const button = screen.getByTestId('theme-toggle');
//     fireEvent.click(button);
    
//     // Click on "Dark" option
//     const darkOption = screen.getByText('Dark');
//     fireEvent.click(darkOption);
    
//     // Assert that the theme was set to dark
//     expect(document.documentElement).toHaveClass('dark');
//   });
  
//   it('should switch to system theme when System is clicked', () => {
//     renderWithThemeProvider(<ThemeToggle />);
    
//     // Open the dropdown
//     const button = screen.getByRole('button', { name: /toggle theme/i });
//     fireEvent.click(button);
    
//     // Click on "System" option
//     const systemOption = screen.getByText('System');
//     fireEvent.click(systemOption);
    
//     // Assert that the system theme is applied (it would depend on your OS settings)
//     expect(document.documentElement).toHaveClass('system');
//   });
});
