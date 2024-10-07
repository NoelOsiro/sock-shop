import { Suspense } from 'react'
import { ProductFilter } from "@/components/ProductFilter"
import { AnimatedProductCard } from '@/components/ui/AnimatedProductCard'
import { createFilters, filterProducts, Product} from '@/lib/product'
import { getChildrenProducts } from '@/lib/api'

export const metadata = {
  title: 'Children\'s Socks',
  description: 'Shop our collection of children\'s socks. Find the perfect pair for any occasion.',
  openGraph: {
    images: [
      {
        url: '/images/socks/p.jpg',
        width: 800,
        height: 600,
        alt: 'Children\'s socks',
      },
    ],
  },
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
export default async function WomenPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const products = await getChildrenProducts()

  const filters = createFilters(searchParams)
  const filteredProducts = filterProducts(products, filters)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">For the Kids</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
        <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilter filterSections={filterSections} />
          </Suspense>
        </aside>
        <main className="w-full md:w-3/4">
        {filteredProducts.map((product: Product, index: number) => (
              <AnimatedProductCard key={product._id} product={product} index={index} />
            ))}
        </main>
      </div>
    </div>
  )
}