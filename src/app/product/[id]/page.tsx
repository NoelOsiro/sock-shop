"use client"

import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { products } from '@/data/products'



export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 relative" style={{ aspectRatio: '1 / 1' }}>
        <Image
          src={product.image}
          alt={product.name}
          className="object-contain rounded-lg shadow-md"
          fill
        />
      </div>

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6">{product.description}</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Size</h2>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            <div className="flex flex-wrap gap-4">
              {product.sizes.map((size) => (
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
          <RadioGroup value={selectedColor?.name} onValueChange={(value) => setSelectedColor(product.colors.find(c => c.name === value))}>
            <div className="flex flex-wrap gap-4">
              {product.colors.map((color) => (
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

        <Button size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}