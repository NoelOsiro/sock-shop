import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem} from "@/components/ui/carousel"
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/client'
import Image from 'next/image'
import { AutoplayCarousel } from '@/components/AutoplayCarousel'
import { getFeaturedProducts, getCarouselItems, getSaleProducts } from '@/lib/api'



export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const carouselItems = await getCarouselItems()
  const saleProducts = await getSaleProducts()

  return (
    <div className="space-y-12 lg:space-y-24">
      {/* Hero Carousel */}
      <AutoplayCarousel interval={5000}>
        {carouselItems.map((item) => (
          <CarouselItem key={item._id}>
            <div className="relative h-[400px] md:h-[600px] lg:h-[800px]">
              <Image 
                src={urlFor(item.imageUrl).width(1920).height(1080).url()} 
                alt={item.title} 
                className="w-full h-full object-cover rounded-lg"
                fill
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{item.title}</h2>
                <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white max-w-2xl">{item.description}</p>
                <Link href={item.linkUrl}>
                  <Button size="lg" variant="secondary">Shop Now</Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </AutoplayCarousel>
      {/* Sales Section */}
      <section className="bg-red-50 dark:bg-red-900 py-12 px-4 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Hot Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id} className="group">
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg relative">
                      <Image
                        src={urlFor(product.imageUrl).width(300).height(300).url()}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={300}
                        height={300}
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        {Math.round((1 - (product.salePrice || 0) / product.price) * 100)}% OFF
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground line-through">Ksh {product.price.toFixed(2)}</p>
                      <p className="text-red-500 font-bold">Ksh {product.salePrice?.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/sale">
              <Button variant="secondary" size="lg">View All Deals</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Men', 'Women', 'Children'].map((category) => (
            <Link href={`/${category.toLowerCase()}`} key={category} className="group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[200px] lg:h-[300px]">
                    <Image
                      src={`/images/socks/${category}.jpeg`}
                      alt={`${category}'s Socks`}
                      className="w-full h-full object-contain"
                      fill
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-white">{category}&rsquo;s Socks</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-primary hover:underline flex items-center">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id} className="group">
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={urlFor(product.imageUrl).width(300).height(300).url()}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      width={300}
                      height={300}
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                  <p className="text-muted-foreground">Ksh {product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-primary text-primary-foreground py-12 px-4 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-md text-foreground"
              required
            />
            <Button type="submit" variant="secondary">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
export const revalidate = 10;