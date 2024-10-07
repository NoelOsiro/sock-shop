import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { AnimatedProductCard } from '@/components/ui/AnimatedProductCard'


interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  imageUrl: string
  variants: Array<{
    title: string
    size: string
    color: string
    type: string
    price: number
    stock: number
  }>
}


async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product" ]{
    _id,
    title,
    slug,
    price,
    "imageUrl": images[0].asset->url,
    variants[]->{
      title,
      price,
      stock
    },
    isOnSale,
    salePrice
  }`
  return await client.fetch(query)
}

export default async function Home() {
  const products = await getProducts()
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Socks Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product, index: number) => (
              <AnimatedProductCard key={product._id} product={product} index={index} />
            ))}
      </div>
    </div>
  )
}