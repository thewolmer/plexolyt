'use server';

import { Get } from '@/lib/helper';

import { ProductResponse, ProductsResponse } from '@/types/product';

interface ProductByCategoryProps {
  categoryId: string;
}

export const GetProductsByCategory = async (props: ProductByCategoryProps): Promise<ProductsResponse> => {
  const category = props.categoryId;
  const data = await Get(`/api/products/`, {
    tags: ['products'],
    searchParams: { category },
  });
  return await data.json();
};

interface ProductByIdProps {
  productId: string;
}

export const GetProductById = async (props: ProductByIdProps): Promise<ProductResponse> => {
  const id = props.productId;
  const data = await Get(`/api/products/${id}`, {
    tags: ['products'],
  });
  return await data.json();
};

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

export const GetRelatedProducts = async (props: RelatedProductsProps): Promise<ProductsResponse> => {
  const product = props.productId;
  const category = props.categoryId;
  const data = await Get(`/api/products/related`, {
    searchParams: { product, category },
    tags: ['products'],
  });
  return await data.json();
};

export const GetFeaturedProducts = async (): Promise<ProductsResponse> => {
  const data = await Get(`/api/products`, {
    tags: ['products'],
    searchParams: { featured: 'true' },
  });
  return await data.json();
};
