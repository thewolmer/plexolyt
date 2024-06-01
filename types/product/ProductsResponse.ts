import { ProductWithPayLoad } from './ProductWithPayload';

export interface ProductsResponse {
  status: number;
  data?: ProductWithPayLoad[];
  message?: string;
}
