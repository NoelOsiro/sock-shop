import { createFilters, FilterOptions } from "@/lib/product";

describe('createFilters', () => {
    it('should create filter options from search parameters', () => {
      const searchParams = {
        price: '10,100',
        onSale: 'true',
        inStock: 'true',
        size: 'M,L',
        color: 'red,blue',
        type: 'socks',
        material: 'cotton',
      };
  
      const expectedFilters: FilterOptions = {
        minPrice: 10,
        maxPrice: 100,
        onSale: true,
        inStock: true,
        size: ['M', 'L'],
        color: ['red', 'blue'],
        type: 'socks',
        material: 'cotton',
      };
  
      const filters = createFilters(searchParams);
      expect(filters).toEqual(expectedFilters);
    });
  
    it('should handle missing price range', () => {
      const searchParams = { price: '' };
  
      const expectedFilters: FilterOptions = {
        minPrice: undefined,
        maxPrice: undefined,
      };
  
      const filters = createFilters(searchParams);
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
    });
  
    it('should handle undefined search parameters', () => {
      const searchParams: { [key: string]: string | string[] | undefined } = {};
  
      const expectedFilters: FilterOptions = {
        minPrice: undefined,
        maxPrice: undefined,
        onSale: false,
        inStock: false,
        size: undefined,
        color: undefined,
        type: undefined,
        material: undefined,
      };
  
      const filters = createFilters(searchParams);
      expect(filters).toEqual(expectedFilters);
    });
  
    it('should handle missing boolean values gracefully', () => {
        const searchParams = { onSale: '', inStock: '' };
  
        const expectedFilters: FilterOptions = {
            onSale: false, // Default to false when empty
            inStock: false, // Default to false when empty
        };
  
        const filters = createFilters(searchParams);
        expect(filters.onSale).toBe(false);
        expect(filters.inStock).toBe(false);
    });

    it('should handle invalid boolean values', () => {
        const searchParams = { onSale: 'notABoolean', inStock: '123' };
  
        const expectedFilters: FilterOptions = {
            onSale: false, // Invalid value defaults to false
            inStock: false, // Invalid value defaults to false
        };
  
        const filters = createFilters(searchParams);
        expect(filters.onSale).toBe(false);
        expect(filters.inStock).toBe(false);
    });

    it('should parse multiple size values correctly', () => {
        const searchParams = { size: 'M,L,XL' };
  
        const expectedFilters: FilterOptions = {
            size: ['M', 'L', 'XL'],
        };
  
        const filters = createFilters(searchParams);
        expect(filters.size).toEqual(['M', 'L', 'XL']);
    });

    it('should handle missing size or color values', () => {
        const searchParams = { size: '', color: '' };
    
        const filters = createFilters(searchParams);
        expect(filters.size).toBeUndefined();
        expect(filters.color).toBeUndefined();
    });
    

    it('should handle invalid price range values', () => {
        const searchParams = { price: 'notANumber,100' };
  
        const expectedFilters: FilterOptions = {
            minPrice: undefined, // Invalid value should result in undefined
            maxPrice: 100,
        };
  
        const filters = createFilters(searchParams);
        expect(filters.minPrice).toBeUndefined();
        expect(filters.maxPrice).toBe(100);
    });

    it('should return undefined minPrice and maxPrice for completely invalid price input', () => {
        const searchParams = { price: 'invalid,alsoInvalid' };
  
        const expectedFilters: FilterOptions = {
            minPrice: undefined,
            maxPrice: undefined,
        };
  
        const filters = createFilters(searchParams);
        expect(filters.minPrice).toBeUndefined();
        expect(filters.maxPrice).toBeUndefined();
    });

    it('should handle missing type and material gracefully', () => {
        const searchParams = { type: '', material: '' };
  
        const expectedFilters: FilterOptions = {
            type: undefined,
            material: undefined,
        };
  
        const filters = createFilters(searchParams);
        expect(filters.type).toBeUndefined();
        expect(filters.material).toBeUndefined();
    });

    it('should handle partial price values correctly', () => {
        const searchParams = { price: '50,' };
  
        const expectedFilters: FilterOptions = {
            minPrice: 50,
            maxPrice: undefined,
        };
  
        const filters = createFilters(searchParams);
        expect(filters.minPrice).toBe(50);
        expect(filters.maxPrice).toBeUndefined();
    });

  });