'use server';

import { Get } from '@/lib/helper';

import { AllCategoriesResponse, CategoryById } from '@/types/categories';

export const GetAllCategories = async (): Promise<AllCategoriesResponse> => {
  const res = await Get('/api/categories', {
    tags: ['categories'],
  });
  return await res.json();
};

export const GetCategoryById = async ({ categoryId }: { categoryId: string }): Promise<CategoryById> => {
  const id = categoryId;
  const res = await Get(`/api/categories`, {
    tags: ['categories'],
    searchParams: { id },
  });
  return await res.json();
};
