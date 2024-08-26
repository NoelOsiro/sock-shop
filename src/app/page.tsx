import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const products = [
  { id: 1, name: "Cozy Wool Socks", price: 1299, image: "/images/socks/OIP.jpeg" },
  { id: 2, name: "Athletic Performance Socks", price: 999, image: "/images/socks/p.jpg" },
  { id: 3, name: "Funky Pattern Socks", price: 1499, image: "/images/socks/R.jpeg" },
  { id: 4, name: "Bamboo Eco-Friendly Socks", price: 1699, image: "/images/socks/th.jpeg" },
  { id: 5, name: "Cozy Wool Socks", price: 1299, image: "/images/socks/OIP.jpeg" },
  { id: 6, name: "Athletic Performance Socks", price: 999, image: "/images/socks/p.jpg" },
  { id: 7, name: "Funky Pattern Socks", price: 1499, image: "/images/socks/R.jpeg" },
  { id: 8, name: "Bamboo Eco-Friendly Socks", price: 1699, image: "/images/socks/th.jpeg" },
]

export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Socks Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" height={192} width={200} />
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