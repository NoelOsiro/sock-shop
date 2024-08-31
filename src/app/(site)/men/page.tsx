"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductFilter } from "@/components/ProductFilter"
import { client, urlFor } from '@/sanity/lib/client'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  imageUrl: string
}

const filterSections = [
  {
    id: 'price',
    title: 'Price',
    type: 'range' as const,
    range: {
      min: 100,
      max: 250,
      step: 10,
    },
  },
  {
    id: 'size',
    title: 'Size',
    type: 'checkbox' as const,
    options: [
      { id: 's', label: 'Small' },
      { id: 'm', label: 'Medium' },
      { id: 'l', label: 'Large' },
      { id: 'xl', label: 'X-Large' },
    ],
  },
  {
    id: 'color',
    title: 'Color',
    type: 'checkbox' as const,
    options: [
      { id: 'black', label: 'Black' },
      { id: 'white', label: 'White' },
      { id: 'gray', label: 'Gray' },
      { id: 'blue', label: 'Blue' },
      { id: 'red', label: 'Red' },
    ],
  },
  {
    id: 'type',
    title: 'Type',
    type: 'radio' as const,
    options: [
      { id: 'crew', label: 'Crew' },
      { id: 'ankle', label: 'Ankle' },
      { id: 'no-show', label: 'No Show' },
      { id: 'knee-high', label: 'Knee High' },
    ],
  },
  {
    id: 'material',
    title: 'Material',
    type: 'checkbox' as const,
    options: [
      { id: 'cotton', label: 'Cotton' },
      { id: 'wool', label: 'Wool' },
      { id: 'polyester', label: 'Polyester' },
      { id: 'bamboo', label: 'Bamboo' },
    ],
  },
]

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async (filters: Record<string, any> = {}) => {
    setIsLoading(true)
    // Here you would typically construct a query based on the filters
    // For now, we'll just fetch all men's products
    const fetchedProducts = await client.fetch(`*[_type == "product" && category == "men"]{
      _id,
      name,
      slug,
      price,
      "imageUrl": image.asset->url
    }`)
    setProducts(fetchedProducts)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleFilterChange = (filters: Record<string, any>) => {
    console.log('Filters applied:', filters)
    fetchProducts(filters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Men&rsquo;s Socks</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <ProductFilter
            filterSections={filterSections}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className="w-full md:w-3/4">
          {isLoading ? (
            <div>Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product._id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <Image src={urlFor(product.imageUrl).width(200).height(200).url()} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" width={100} height={192} />                    <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/product/${product.slug.current}`} passHref>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}