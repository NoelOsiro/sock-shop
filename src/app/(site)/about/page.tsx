import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: 'About Sock Shop',
  description: 'Learn more about Sock Shop',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About Sock Shop</h1>
      <p className="mb-4">
        Welcome to Sock Shop, your one-stop destination for high-quality, comfortable, and stylish socks. Founded in 2023, we&apos;ve made it our mission to keep your feet happy, cozy, and fashionable.
      </p>
      <p className="mb-4">
        At Sock Shop, we believe that great socks are the foundation of a great outfit. That&apos;s why we offer a wide range of socks for men, women, and children, suitable for every occasion - from casual everyday wear to formal events.
      </p>
      <p className="mb-4">
        Our team of sock enthusiasts works tirelessly to source the best materials and designs, ensuring that every pair of socks we sell meets our high standards of quality and style.
      </p>
      <p className="mb-6">
        We&apos;re committed to sustainability too. Many of our socks are made from eco-friendly materials, and we&apos;re constantly working to reduce our environmental impact.
      </p>
      <Link href="/contact">
        <Button>Contact Us</Button>
      </Link>
    </div>
  )
}