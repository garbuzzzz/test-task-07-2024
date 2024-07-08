export interface AllProductsResponse {
  responseCode: number;
  products: ProductItem[];
}

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  brand: string;
  category: object;
}

export interface AllBrandsResponse {
  responseCode: number;
  brands: BrandItem[];
}

export interface BrandItem {
  id: string;
  brand: string;
}

export interface RegisterUserAccountResponse {
  responseCode: number;
  message: string;
}
