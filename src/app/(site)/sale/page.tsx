import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const saleProducts = [
  { id: 13, name: "Striped Cotton Socks", price: 9.99, salePrice: 7.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 14, name: "Polka Dot Wool Socks", price: 14.99, salePrice: 11.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 15, name: "Solid Color Bamboo Socks", price: 12.99, salePrice: 9.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 16, name: "Argyle Cashmere Socks", price: 19.99, salePrice: 15.99, image: "/placeholder.svg?height=200&width=200" },
]

export default function SalePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Sale Items</h1>
      <p className="mb-6">Don&apos;t miss out on these great deals! Limited time offers on select styles.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {saleProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" height={192} width={192}/>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-primary">${product.salePrice.toFixed(2)}</p>
                <p className="text-lg line-through text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
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