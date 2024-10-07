import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PressPage from '@/app/(site)/press/page';

describe('PressPage', () => {
    it('renders the Press Room heading', () => {
        render(<PressPage />);
        const heading = screen.getByTestId('press-page-title');
        expect(heading).toBeInTheDocument();
    });

    it('renders the recent press releases', () => {
        render(<PressPage />);
        const pressReleases = [
            "Sock Shop Launches Eco-Friendly Line",
            "Sock Shop Expands to International Markets",
            "Sock Shop Partners with Local Charities"
        ];

        pressReleases.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders the media contact information', () => {
        render(<PressPage />);
        const email = screen.getByText(/press@sockshop.com/i);
        const phone = screen.getByText(/\(555\) 123-4567/i);
        expect(email).toBeInTheDocument();
        expect(phone).toBeInTheDocument();
    });

    it('renders the Contact Us button', () => {
        render(<PressPage />);
        const contactButton = screen.getByRole('button', { name: /Contact Us/i });
        expect(contactButton).toBeInTheDocument();
    });
});