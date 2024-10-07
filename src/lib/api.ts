import { client } from "@/sanity/lib/client"
import { CarouselItem, Product } from "./product"
import { cache } from "react"

export async function getMensProducts(): Promise<Product[]> {
    const query = `*[_type == "product" && category->title == "Men"]{
      _id,
    title,
    slug,
    description,
    price,
    "imageUrl": images[0].asset->url,
    variants[]->{
      title,
      price,
      stock,
      material,
      type,
        size,
        color
    },
    isOnSale,
    salePrice
  }`
    return await client.fetch(query)
  }

  export async function getWomensProducts(): Promise<Product[]> {
    const query = `*[_type == "product" && category->title == "Women"]{
      _id,
    title,
    slug,
    description,
    price,
    "imageUrl": images[0].asset->url,
    variants[]->{
      title,
      price,
      stock,
      material,
      type,
        size,
        color
    },
    isOnSale,
    salePrice
  }`
    return await client.fetch(query)
  }

  export async function getChildrenProducts(): Promise<Product[]> {
    const query = `*[_type == "product" && category->title == "Children"]{
      _id,
    title,
    slug,
    description,
    price,
    "imageUrl": images[0].asset->url,
    variants[]->{
      title,
      price,
      stock,
      material,
      type,
        size,
        color
    },
    isOnSale,
    salePrice
  }`
    return await client.fetch(query)
  }

  export async function getFeaturedProducts(): Promise<Product[]> {
    return await client.fetch(`*[_type == "product" && isFeatured == true][0...8]{
      _id,
      title,
      description,
      slug,
      price,
      "imageUrl": images[0].asset->url
    }`)
  }
  export async function getSaleProducts(): Promise<Product[]> {
    return await client.fetch(`*[_type == "product" && defined(salePrice)][0...4]{
      _id,
      name,
      description,
      slug,
      price,
      salePrice,
      "imageUrl": images[0].asset->url
    }`)
  }
  
  export async function getCarouselItems(): Promise<CarouselItem[]> {
    return await client.fetch(`*[_type == "carouselItem"]{
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      linkUrl
    }`)
  }



  export const getProductBySlug = cache(async(slug: string): Promise<Product | null> =>{
    if (!slug) return null;
  
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        description,
        price,
        "imageUrl": images[0].asset->url,
        variants[]->{
          title,
          price,
          stock,
          material,
          type,
          size,
          color
        },
        isOnSale,
        salePrice
      }`,
      { slug }
    );
  
    return product || null;
  });
  
  export async function getProducts(): Promise<Product[]> {
    const query = `*[_type == "product"]{
    _id,
    title,
    slug,
    description,
    price,
    "imageUrl": images[0].asset->url,
    variants[]->{
      title,
      price,
      stock,
      material,
      type,
        size,
        color
    },
    isOnSale,
    salePrice
  }`
    return await client.fetch(query)
}  