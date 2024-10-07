"use client"

import { notFound, useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useState, useEffect, MouseEventHandler } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { getProductBySlug } from '@/lib/api' 

import { Product } from '@/lib/product'
import { urlFor } from '@/sanity/lib/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CatrContext'

// Interfaces for props
interface ProductImageProps {
  product: { imageUrl: SanityImageSource; title: string };
}

interface ProductDescriptionProps {
  product: {
    title: string;
    price: number;
    description: string;
  };
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  sizes: string[];
  selectedColor: string;
  setSelectedColor: (arg0: string) => void;
  colors: { name: string; hex: string }[];
  handleAddToCart: MouseEventHandler<HTMLButtonElement>;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  return (
    <motion.div
      className="md:w-1/2 relative"
      style={{ aspectRatio: '1 / 1' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={urlFor(product.imageUrl).width(800).height(800).url() ?? ''}
        alt={product.title}
        className="object-cover rounded-lg shadow-md"
        fill
      />
    </motion.div>
  );
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  sizes,
  colors,
  handleAddToCart
}) => {
  return (
    <motion.div
      className="md:w-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
      <p className="mb-6">{product.description}</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Size</h2>
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
          <div className="flex flex-wrap gap-4">
            {sizes.map(size => (
              <div key={size}>
                <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Color</h2>
        <RadioGroup value={selectedColor ?? ''} onValueChange={setSelectedColor}>
          <div className="flex flex-wrap gap-4">
            {colors.map(color => (
              <div key={color.name}>
                <RadioGroupItem value={color.name} id={`color-${color.name}`} className="peer sr-only" />
                <Label
                  htmlFor={`color-${color.name}`}
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">{color.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Button size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </motion.div>
  );
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const { addToCart } = useCart()
  const { toast } = useToast()
  const sizes = ["S", "M", "L", "XL"]
  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Black", hex: "#000000" },
  ]

  // Fetch the product data using useEffect when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductBySlug(params.slug)

        if (fetchedProduct) {
          setProduct(fetchedProduct)
          setSelectedSize(fetchedProduct.variants[0].size)
          setSelectedColor(fetchedProduct.variants[0].color)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound() // Trigger a 404 if there was an error in fetching
      }
    }

    fetchProduct()
  }, [params.slug])

  if (!product) {
    return <p>Loading...</p> // Loading state while fetching
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart({
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      })
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    }
  }

  return (
    <>
      <ProductImage product={product} />
      <ProductDescription
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        sizes={sizes}
        colors={colors}
        handleAddToCart={handleAddToCart}
      />
    </>
  )
}
