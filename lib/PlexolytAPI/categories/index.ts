'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Get } from '@/lib/helper';

import { AllCategoriesResponse, CategoryById } from '@/types/categories';

export const GetAllCategories = async (): Promise<AllCategoriesResponse> => {
  try {
    const res = await Get('/api/categories', {
      tags: ['categories'],
    });
    return await res.json();
  } catch (e: any) {
    return {
      status: 500,
      message: e.message,
    };
  }
};

export const GetCategoryById = async ({ categoryId }: { categoryId: string }): Promise<CategoryById> => {
  const id = categoryId;
  try {
    const res = await Get(`/api/categories`, {
      tags: ['categories'],
      searchParams: { id },
    });
    return await res.json();
  } catch (e: any) {
    return {
      status: 500,
      message: e.message,
    };
  }
};
