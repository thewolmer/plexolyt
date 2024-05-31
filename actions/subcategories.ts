'use server';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { subcategoryFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllSubCategories = cache(
  async () => {
    try {
      const subcategory = await db.subCategory.findMany({});
      return { status: 200, data: subcategory };
    } catch (e) {
      console.log('[action:getAllSubCategorys]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },
  ['getAllSubCategories'],
  {
    revalidate: 3600,
  },
);

export const getSubCategoryByID = async (subcategoryID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const subcategory = await db.subCategory.findUnique({
      where: {
        id: subcategoryID,
      },
    });
    return { status: 200, message: 'SubCategory created successfully!', data: subcategory };
  } catch (e) {
    console.log('[action:getAllSubCategoryByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createSubCategory = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const subcategory = await db.subCategory.create({
      data: {
        id: slugify(parsedData.name),
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'SubCategory created successfully!', data: subcategory };
  } catch (e) {
    console.log('[action:createSubCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteSubCategory = async (subcategoryID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!subcategoryID) return { message: 'Invalid subcategory ID!', status: 400 };
  try {
    const subcategory = await db.subCategory.delete({
      where: {
        id: subcategoryID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'SubCategory deleted successfully!', data: subcategory };
  } catch (e) {
    console.log('[action:deleteSubCategory]', e);
    return { message: 'This subcategory is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateSubCategory = async (subcategoryID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const subcategory = await db.subCategory.update({
      where: {
        id: subcategoryID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'SubCategory updated successfully!', data: subcategory };
  } catch (e) {
    console.log('[action:updateSubCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
