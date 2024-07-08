export type NavBarItem =
  | 'products'
  | 'view_cart'
  | 'login'
  | 'test_cases'
  | 'api_list';
export type ProductItemAvailability = 'In Stock';
export type ProductItemCondition = 'New';
export type ProductItemBrand = 'Polo' | 'Madame' | 'Babyhug' | 'H&M';

export interface ProductDetails {
  name: string;
  category: string;
  price: number;
  availability: ProductItemAvailability;
  condition: ProductItemCondition;
  brand: ProductItemBrand;
}
