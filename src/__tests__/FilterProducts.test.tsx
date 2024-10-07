import { FilterOptions, filterProducts, Product } from "@/lib/product";

const mockProducts: Product[] = [
    {
        _id: '1',
        title: 'Product 1',
        slug: { current: 'product-1' },
        price: 50,
        imageUrl: 'image1.jpg',
        variants: [
            { title: 'Variant 1', price: 50, stock: 5, size: 'M', color: 'red', type: 'socks', material: 'cotton' },
            { title: 'Variant 2', price: 60, stock: 0, size: 'L', color: 'blue', type: 'socks', material: 'cotton' }
        ],
        isOnSale: true,
        salePrice: 45,
    },
    {
        _id: '2',
        title: 'Product 2',
        slug: { current: 'product-2' },
        price: 150,
        imageUrl: 'image2.jpg',
        variants: [
            { title: 'Variant 1', price: 150, stock: 0, size: 'S', color: 'black', type: 'hat', material: 'wool' }
        ],
        isOnSale: false,
        salePrice: null,
    },
    // Add more mock products as needed
];

describe('filterProducts', () => {
    it('should filter products by price range', () => {
        const filters: FilterOptions = { minPrice: 10, maxPrice: 100 };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 fits in this price range
    });

    it('should filter products by sale status', () => {
        const filters: FilterOptions = { onSale: true };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 is on sale
    });

    it('should filter products by stock availability', () => {
        const filters: FilterOptions = { inStock: true };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 has stock
    });

    it('should filter products by size', () => {
        const filters: FilterOptions = { size: ['M'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 has a variant with size M
    });

    it('should filter products by color', () => {
        const filters: FilterOptions = { color: ['red'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 has a variant with color red
    });

    it('should filter products by type', () => {
        const filters: FilterOptions = { type: 'hat' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 2 is a hat
    });

    it('should filter products by material', () => {
        const filters: FilterOptions = { material: 'cotton' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 is made of cotton
    });

    it('should handle missing filters', () => {
        const filters: FilterOptions = {};
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(2); // No filters applied, so all products should be returned
    });
    it('should return no products if none match the price range', () => {
        const filters: FilterOptions = { minPrice: 200, maxPrice: 300 };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(0); // No product in this price range
    });

    it('should return all products if price filters are undefined', () => {
        const filters: FilterOptions = { minPrice: undefined, maxPrice: undefined };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(2); // Both products should be returned
    });

    it('should return no products if none are on sale', () => {
        const filters: FilterOptions = { onSale: true };
        const result = filterProducts([{ ...mockProducts[1], isOnSale: false }], filters); // Test with all products not on sale
        expect(result.length).toBe(0); // No product is on sale
    });

    it('should return no products if none are in stock', () => {
        const filters: FilterOptions = { inStock: true };
        const result = filterProducts([{ ...mockProducts[1], variants: [{ ...mockProducts[1].variants[0], stock: 0 }] }], filters); // All stock is 0
        expect(result.length).toBe(0); // No product is in stock
    });

    it('should filter products with multiple size filters', () => {
        const filters: FilterOptions = { size: ['M', 'L'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 has variants with sizes M and L
    });

    it('should filter products with multiple color filters', () => {
        const filters: FilterOptions = { color: ['red', 'blue'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Product 1 has both red and blue variants
    });

    it('should return no products if material does not match', () => {
        const filters: FilterOptions = { material: 'silk' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(0); // No products are made of silk
    });

    it('should filter products by multiple conditions (e.g., onSale, size, color)', () => {
        const filters: FilterOptions = { onSale: true, size: ['M'], color: ['red'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 1 fits all conditions
    });

    it('should return no products if one filter excludes all matches (e.g., size filter)', () => {
        const filters: FilterOptions = { size: ['XXL'] };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(0); // No product has size XXL
    });

    it('should filter products by type regardless of case sensitivity', () => {
        const filters: FilterOptions = { type: 'SOCKS' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Product 1 has type socks, case insensitive
    });

    it('should filter products by partial material match', () => {
        const filters: FilterOptions = { material: 'wool' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(1); // Only Product 2 has wool material
    });

    it('should handle multiple types and return correct products', () => {
        const filters: FilterOptions = { type: 'socks,hat' };
        const result = filterProducts(mockProducts, filters);
        expect(result.length).toBe(2); // Both products (socks and hat) should be returned
    });
});
