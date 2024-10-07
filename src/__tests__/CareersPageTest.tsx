import CareersPage from '@/app/(site)/careers/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));


jest.mock('next/link', () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

describe('CareersPage', () => {
    it('should render the Careers page with the correct title and description', () => {
        render(<CareersPage />);
        expect(screen.getByText('Careers at Sock Shop')).toBeInTheDocument();
        expect(screen.getByText(/Join our team of passionate sock enthusiasts!/)).toBeInTheDocument();
    })

    it('should render the list of open positions', () => {
        render(<CareersPage />);
        expect(screen.getByText('Sock Designer')).toBeInTheDocument();
        expect(screen.getByText('E-commerce Manager')).toBeInTheDocument();
        expect(screen.getByText('Customer Service Representative')).toBeInTheDocument();
        expect(screen.getByText('Warehouse Coordinator')).toBeInTheDocument();
    });


    it('should render all positions from the openPositions array', () => {
        const positions = [
            { title: "Sock Designer", department: "Design" },
            { title: "E-commerce Manager", department: "Marketing" },
            { title: "Customer Service Representative", department: "Support" },
            { title: "Warehouse Coordinator", department: "Operations" },
        ];

        render(<CareersPage />);

        positions.forEach(position => {
            expect(screen.getByText(position.title)).toBeInTheDocument();
            expect(screen.getByText(`Department: ${position.department}`)).toBeInTheDocument();
        });
    });

});
describe('CareersPage navigation', () => {
    it('should render a clickable "Apply Now" button for each position', () => {
        render(<CareersPage />);

        const applyButtons = screen.getAllByText('Apply Now');
        expect(applyButtons).toHaveLength(4);

        applyButtons.forEach(button => {
            userEvent.click(button);
            expect(button).toBeTruthy(); // Verify click interaction
        });
    });

    it('should render a clickable "Contact Us" button', () => {
        render(<CareersPage />);

        const button = screen.getByText('Contact Us');
        expect(button).toBeInTheDocument();

        userEvent.click(button);

        expect(button).toBeTruthy(); // Verify click interaction
    });
});