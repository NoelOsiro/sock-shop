import ReturnsPage from '@/app/(site)/returns/page';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ReturnsPage', () => {
  it('renders the ReturnsPage correctly', () => {
    render(<ReturnsPage />);

    // Check for main title
    expect(screen.getByRole('heading', { name: /returns & exchanges/i })).toBeInTheDocument();

    // Check for paragraph content
    expect(screen.getByText(/we want you to be completely satisfied with your Sock Shop purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/if you have any questions about our return policy/i)).toBeInTheDocument();
  });

  it('renders accordion with correct content and allows toggling', () => {
    render(<ReturnsPage />);

    // Find accordion triggers
    const returnPolicyTrigger = screen.getByTestId('return-policy')
    const exchangePolicyTrigger = screen.getByText(/exchange policy/i);
    const initiateReturnTrigger = screen.getByText(/how to initiate a return or exchange/i);
    const refundProcessingTrigger = screen.getByText(/refund processing/i);

    // Accordion should be collapsed initially
    expect(screen.queryByText(/you may return any unworn, unwashed items/i)).not.toBeInTheDocument();

    // Expand return policy
    if (returnPolicyTrigger) {
      fireEvent.click(returnPolicyTrigger);
    }
    expect(screen.getByText(/you may return any unworn, unwashed items/i)).toBeVisible();

    // Expand exchange policy
    fireEvent.click(exchangePolicyTrigger);
    expect(screen.getByText(/if you need a different size or color/i)).toBeVisible();

    // Expand initiate return section
    fireEvent.click(initiateReturnTrigger);
    expect(screen.getByText(/log into your account and go to your order history/i)).toBeVisible();

    // Expand refund processing section
    fireEvent.click(refundProcessingTrigger);
    expect(screen.getByText(/please allow 5-7 business days for us to process/i)).toBeVisible();
  });

  

  it('ensures accordion items are collapsible', () => {
    render(<ReturnsPage />);

    // Check the trigger for return policy and expand it
    const returnPolicyTrigger = screen.getByTestId('return-policy')
    fireEvent.click(returnPolicyTrigger);
    expect(screen.getByText(/you may return any unworn, unwashed items/i)).toBeVisible();

    // Collapse return policy by clicking again
    fireEvent.click(returnPolicyTrigger);
    expect(screen.queryByText(/you may return any unworn, unwashed items/i)).not.toBeInTheDocument();
  });

  it('has accessible ARIA attributes for accordion items', () => {
    render(<ReturnsPage />);

    // Verify the accordion trigger has appropriate ARIA attributes
    const returnPolicyTrigger = screen.getByTestId('return-policy')
    expect(returnPolicyTrigger).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(returnPolicyTrigger);
    expect(returnPolicyTrigger).toHaveAttribute('aria-expanded', 'true');
  });
});
