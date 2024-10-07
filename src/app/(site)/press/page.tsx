import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PressPage() {
  const pressReleases = [
    { title: "Sock Shop Launches Eco-Friendly Line", date: "June 15, 2023" },
    { title: "Sock Shop Expands to International Markets", date: "May 1, 2023" },
    { title: "Sock Shop Partners with Local Charities", date: "April 12, 2023" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6" data-testid="press-page-title">Press Room</h1>
      <p className="mb-6">
        Welcome to the Sock Shop Press Room. Here you&apos;ll find our latest news, press releases, and media resources.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Recent Press Releases</h2>
      <ul className="space-y-4 mb-6">
        {pressReleases.map((release, index) => (
          <li key={index} className="bg-secondary p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{release.title}</h3>
            <p className="text-muted-foreground">{release.date}</p>
            <Button className="mt-2" variant="outline">Read More</Button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Media Contact</h2>
      <p className="mb-4">
        For press inquiries, please contact our media relations team:
      </p>
      <p className="mb-6">
        Email: press@sockshop.com<br />
        Phone: (555) 123-4567
      </p>
      <Link href="/contact">
        <Button>Contact Us</Button>
      </Link>
    </div>
  )
}