// schemas/productVariant.js
const productVariantSchema = {
    name: 'productVariant',
    title: 'Product Variant',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'size',
        title: 'Size',
        type: 'string',
        options: {
          list: ['S', 'M', 'L', 'XL'],
        },
      },
      {
        name: 'color',
        title: 'Color',
        type: 'string',
        options: {
          list: ['Black', 'Brown', 'Green', 'Blue', 'Red'],
        },
      },
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: ['Ankle', 'Happy Socks', 'Crew', 'No Show'],
        },
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
      },
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'material',
        title: 'Material',
        type: 'string',
        options: {
          list: ['Cotton', 'Wool', 'Polyester', 'Silk', 'Nylon'],
        }
      }
      
    ],
  };

export default productVariantSchema;