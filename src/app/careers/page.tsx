import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CareersPage() {
  const openPositions = [
    { title: "Sock Designer", department: "Design" },
    { title: "E-commerce Manager", department: "Marketing" },
    { title: "Customer Service Representative", department: "Support" },
    { title: "Warehouse Coordinator", department: "Operations" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Careers at Sock Shop</h1>
      <p className="mb-6">
        Join our team of passionate sock enthusiasts! At Sock Shop, we&apos;re always looking for talented individuals who share our love for great socks and excellent customer service.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
      <ul className="space-y-4 mb-6">
        {openPositions.map((position, index) => (
          <li key={index} className="bg-secondary p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{position.title}</h3>
            <p className="text-muted-foreground">Department: {position.department}</p>
            <Link href="/contact">
              <Button className="mt-2" variant="outline">Apply Now</Button>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mb-4">
        Don&apos;t see a position that fits your skills? We&apos;re always interested in hearing from talented individuals. Send us your resume and let us know how you can contribute to the Sock Shop team.
      </p>
      <Link href="/contact">
        <Button>Contact Us</Button>
      </Link>
    </div>
  )
}