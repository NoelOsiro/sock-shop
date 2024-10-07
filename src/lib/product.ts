import { client } from "@/sanity/lib/client"

export interface CarouselItem {
    _id: string
    title: string
    description: string
    imageUrl: string
    linkUrl: string
  }

export interface Variant {
    title: string
    price: number
    stock: number
    size: string
    color: string
    type: string
    material: string

}

export interface Product {
    _id: string
    title: string
    description: string
    slug: { current: string }
    price: number
    imageUrl: string
    variants: Variant[]
    isOnSale: boolean
    salePrice: number | null
}




export interface FilterOptions {
    minPrice?: number
    maxPrice?: number
    onSale?: boolean
    inStock?: boolean
    size?: string[]
    color?: string[]
    type?: string
    material?: string
}

export function createFilters(searchParams: { [key: string]: string | string[] | undefined }): FilterOptions {
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    // Handle the price range, ensuring NaN values are handled
    if (typeof searchParams.price === 'string') {
        const priceRange = searchParams.price.split(',');
        const parsedMinPrice = priceRange[0] ? Number(priceRange[0]) : undefined;
        const parsedMaxPrice = priceRange[1] ? Number(priceRange[1]) : undefined;

        // If the parsed values are NaN, treat them as undefined
        minPrice = isNaN(parsedMinPrice ?? NaN) ? undefined : parsedMinPrice;
        maxPrice = isNaN(parsedMaxPrice ?? NaN) ? undefined : parsedMaxPrice;
    }

    // Handle the size and color
    const sizeArray = typeof searchParams.size === 'string' ? searchParams.size.split(',').filter(s => s) : undefined;
    const colorArray = typeof searchParams.color === 'string' ? searchParams.color.split(',').filter(c => c) : undefined;
    
    return {
        minPrice,
        maxPrice,
        onSale: searchParams.onSale === 'true',
        inStock: searchParams.inStock === 'true',
        size: sizeArray && sizeArray.length > 0 ? sizeArray : undefined,
        color: colorArray && colorArray.length > 0 ? colorArray : undefined,
        type: typeof searchParams.type === 'string' && searchParams.type !== '' 
            ? searchParams.type 
            : undefined,
        material: typeof searchParams.material === 'string' && searchParams.material !== '' 
            ? searchParams.material 
            : undefined,
    };
}


export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
    return products.filter(product => {
        if (filters.minPrice && product.price < filters.minPrice) return false
        if (filters.maxPrice && product.price > filters.maxPrice) return false
        if (filters.onSale && !product.isOnSale) return false
        if (filters.inStock && !product.variants.some(v => v.stock > 0)) return false
        if (filters.size && !product.variants.some(v => filters.size!.includes(v.size.split(' ')[0]))) return false
        if (filters.color && !product.variants.some(v => filters.color!.includes(v.color.split(' ')[0]))) return false
        if (filters.type && !product.variants.some(v => filters.type!.toLowerCase().includes(v.type.toLowerCase()))) return false
        // Assuming material is a property of the product, not the variant
        if (filters.material && !product.variants.some(v => v.material?.toLowerCase().includes(filters.material!.toLowerCase()))) return false
        return true
    })
}