import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const products = [
  { id: 5, name: "Women's Ankle Socks", price: 1299, image: "/images/socks/OIP.jpeg" },
  { id: 6, name: "Women's Knee-High Socks", price: 1199, image: "/images/socks/p.jpg" },
  { id: 7, name: "Women's Fuzzy Socks", price: 1499, image: "/images/socks/p.jpg" },
  { id: 8, name: "Women's Running Socks", price: 999, image: "/images/socks/p.jpg"},
]

export default function WomenPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Women&apos;s Socks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
            <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" width={100} height={192} />
              <p className="text-2xl font-bold">Ksh {product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/product/${product.id}`} passHref>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}