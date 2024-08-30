

// schemas/product.js
const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: import('sanity').Rule) => Rule.required().max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: import('sanity').Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: import('sanity').Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule: import('sanity').Rule) => Rule.required().min(0),
      },
      {
        name: 'sku',
        title: 'SKU',
        type: 'string',
        validation: (Rule: import('sanity').Rule) => Rule.required(),
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule: import('sanity').Rule) => Rule.required(),
      },
      {
        name: 'brand',
        title: 'Brand',
        type: 'reference',
        to: [{ type: 'brand' }],
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
        validation: (Rule: import('sanity').Rule) => Rule.required().min(1).max(10),
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'variants',
        title: 'Variants',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'productVariant' }] }],
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule: import('sanity').Rule) => Rule.required().min(0),
      },
      {
        name: 'reviews',
        title: 'Reviews',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'review' }] }],
      },
      {
        name: 'relatedProducts',
        title: 'Related Products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
      {
        name: 'isFeatured',
        title: 'Featured Product',
        type: 'boolean',
        description: 'Set to true to feature this product on the home page'
      },
      {
        name: 'isOnSale',
        title: 'On Sale',
        type: 'boolean',
      },
      {
        name: 'salePrice',
        title: 'Sale Price',
        type: 'number',
        hidden: ({ document }: { document: any }) => !document?.isOnSale,
      },
    ],
  };
export default productSchema;
  