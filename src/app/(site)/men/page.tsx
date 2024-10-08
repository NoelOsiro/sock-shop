import { Suspense } from 'react'
import { ProductFilter } from "@/components/ProductFilter"

import { createFilters,filterProducts, Product } from '@/lib/product'
import { getMensProducts } from '@/lib/api'
import { filterSections } from '@/lib/filters'
import AnimatedProductCard from '@/components/ui/AnimatedProductCard'

export const metadata = {
  title: 'Men\'s Socks',
  description: 'Shop our collection of men\'s socks. Find the perfect pair for any occasion.',
  openGraph: {
    images: [
      {
        url: '/images/socks/Men.jpeg',
        width: 800,
        height: 600,
        alt: 'Men\'s socks',
      },
    ],
  },
}



export default async function MenPage({ searchParams = {} }: { searchParams?: { [key: string]: string } }) {
  const products = await getMensProducts()
  
  const filters = createFilters(searchParams)
  const filteredProducts = filterProducts(products, filters)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Men&#39;s Socks</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilter filterSections={filterSections} />
          </Suspense>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product, index: number) => (
              <AnimatedProductCard key={product._id} product={product} index={index}/>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}