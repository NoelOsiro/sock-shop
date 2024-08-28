
// schemas/voucher.js
const voucherSchema = {
    name: 'voucher',
    title: 'Voucher',
    type: 'document',
    fields: [
      {
        name: 'code',
        title: 'Code',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'discountType',
        title: 'Discount Type',
        type: 'string',
        options: {
          list: ['Percentage', 'Fixed Amount'],
        },
      },
      {
        name: 'discountValue',
        title: 'Discount Value',
        type: 'number',
      },
      {
        name: 'expirationDate',
        title: 'Expiration Date',
        type: 'datetime',
      },
      {
        name: 'minimumPurchase',
        title: 'Minimum Purchase Amount',
        type: 'number',
      },
      {
        name: 'applicableProducts',
        title: 'Applicable Products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
    ],
};
 
export default voucherSchema;