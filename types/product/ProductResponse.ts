import { ProductWithPayLoad } from './ProductWithPayload';

export interface ProductResponse {
  status: number;
  data?: ProductWithPayLoad;
  message?: string;
}
