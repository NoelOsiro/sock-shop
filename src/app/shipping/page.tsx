export default function ShippingPage() {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Shipping Information</h1>
        <p className="mb-6">
          At Sock Shop, we strive to get your socks to you as quickly and efficiently as possible. Here&apos;s what you need to know about our shipping options:
        </p>
        <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            <strong>Standard Shipping (3-5 business days):</strong> Free on orders over $50, or $4.99 for orders under $50.
          </li>
          <li className="mb-2">
            <strong>Express Shipping (2-3 business days):</strong> $9.99 for all orders.
          </li>
          <li className="mb-2">
            <strong>Next Day Shipping:</strong> $19.99 for all orders. Order by 2 PM EST for next day delivery.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
        <p className="mb-6">
          We currently ship to select countries. International shipping rates and delivery times vary by location. Please see the checkout page for specific rates and estimated delivery times for your country.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
        <p className="mb-6">
          Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier&apos;s website.
        </p>
        <p>
          If you have any questions about shipping, please don&apos;t hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
      </div>
    )
  }