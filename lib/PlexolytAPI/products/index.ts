'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Get } from '@/lib/helper';

import { ProductResponse, ProductsResponse } from '@/types/product';

interface ProductByCategoryProps {
  categoryId: string;
}

export const GetProductsByCategory = async (props: ProductByCategoryProps): Promise<ProductsResponse> => {
  try {
    const category = props.categoryId;
    const data = await Get(`/api/products/`, {
      tags: ['products'],
      searchParams: { category },
    });
    return await data.json();
  } catch (e: any) {
    return { status: 500, message: e.message };
  }
};

interface ProductByIdProps {
  productId: string;
}

export const GetProductById = async (props: ProductByIdProps): Promise<ProductResponse> => {
  try {
    const id = props.productId;
    const data = await Get(`/api/products/${id}`, {
      tags: ['products'],
    });
    return await data.json();
  } catch (e: any) {
    return { status: 500, message: e.message };
  }
};

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

export const GetRelatedProducts = async (props: RelatedProductsProps): Promise<ProductsResponse> => {
  try {
    const product = props.productId;
    const category = props.categoryId;
    const data = await Get(`/api/products/related`, {
      searchParams: { product, category },
      tags: ['products'],
    });
    return await data.json();
  } catch (e: any) {
    return { status: 500, message: e.message };
  }
};

export const GetFeaturedProducts = async (): Promise<ProductsResponse> => {
  try {
    const data = await Get(`/api/products`, {
      tags: ['products'],
      searchParams: { featured: 'true' },
    });
    return await data.json();
  } catch (e: any) {
    return { status: 500, message: e.message };
  }
};
