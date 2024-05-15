import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { revalidatePath } from '@/utils/Revalidate';

export const getAllCategories = async () => {
  try {
    const category = await db.category.findMany({
      include: {
        billboard: true,
      },
    });
    return { status: 200, data: category };
  } catch (e) {
    console.log('[action:getAllCategories]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getCategoryByID = async (categoryID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryID,
      },
    });
    return { status: 200, message: 'Category created successfully!', data: category };
  } catch (e) {
    console.log('[action:getAllCategoryByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createCategory = async (formData: { name: string; billboardID: string }) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const formSchema = z.object({
      name: z.string().min(2).max(50),
      billboardID: z.string().min(2).max(50),
    });
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const category = await db.category.create({
      data: {
        name: parsedData.name,
        billboardId: parsedData.billboardID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Category created successfully!', data: category };
  } catch (e) {
    console.log('[action:createCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteCategory = async (categoryID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!categoryID) return { message: 'Invalid category ID!', status: 400 };
  try {
    const category = await db.category.delete({
      where: {
        id: categoryID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Category deleted successfully!', data: category };
  } catch (e) {
    console.log('[action:deleteCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const updateCategory = async (categoryID: string, formData: { name: string; billboardID: string }) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const formSchema = z.object({
      name: z.string().min(2).max(50),
      billboardID: z.string().min(2),
    });
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const category = await db.category.update({
      where: {
        id: categoryID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Category updated successfully!', data: category };
  } catch (e) {
    console.log('[action:updateCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
