import { type SchemaTypeDefinition } from 'sanity'
import productSchema from './productSchema'
import productVariantSchema from './productVariantSchema'
import categorySchema from './categorySchema'
import brandSchema from './brandSchema'
import reviewSchema from './reviewSchema'
import carouselSchema from './carouselItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,productVariantSchema,categorySchema,brandSchema,reviewSchema,carouselSchema],
}
