import { Color, Gauge, Length, SubCategory, Width } from '@prisma/client';

export interface ColorsResponse {
  data?: Color[];
  status: number;
  message?: string;
}

export interface LengthsResponse {
  data?: Length[];
  status: number;
  message?: string;
}

export interface WidthsResponse {
  data?: Width[];
  status: number;
  message?: string;
}

export interface GaugesResponse {
  data?: Gauge[];
  status: number;
  message?: string;
}

export interface SubCategoriesResponse {
  data?: SubCategory[];
  status: number;
  message?: string;
}
