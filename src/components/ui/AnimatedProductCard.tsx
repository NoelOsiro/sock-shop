"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

interface AnimatedProductCardProps {
  product: Product
  index: number
}

export function AnimatedProductCard({ product, index }: AnimatedProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            {product.variants.map(v => v.size).filter((v, i, a) => a.indexOf(v) === i).join(', ')} sizes
          </p>
          <p className="text-sm text-gray-500">
            {product.variants.map(v => v.color).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
          </p>
        </CardContent>
        <CardFooter>
          <Link href={`/product/${product.slug.current}`} passHref>
            <Button className="w-full">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}