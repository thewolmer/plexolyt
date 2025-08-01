'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { categoryFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllCategories = async () => {
  try {
    const category = await db.category.findMany({
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 200, data: category };
  } catch (e) {
    console.log('[action:getAllCategories]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });
    if (!category) {
      return { message: 'Category not found!', status: 404 };
    }
    return { status: 200, data: category };
  } catch (e) {
    console.log('[action:getCategoryById]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createCategory = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const category = await db.category.create({
      data: {
        id: slugify(parsedData.name),
        name: parsedData.name,
        description: parsedData.description,
        billboardId: parsedData.billboardId,
        textColor: parsedData.textColor,
      },
    });
    revalidatePath('/');
    revalidateTag('categories');
    return { status: 200, message: 'Category created successfully!', data: category };
  } catch (e) {
    console.log('[action:createCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteCategory = async (categoryId: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!categoryId) return { message: 'Invalid category ID!', status: 400 };
  try {
    const category = await db.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath('/');
    revalidateTag('categories');
    return { status: 200, message: 'Category deleted successfully!', data: category };
  } catch (e) {
    console.log('[action:deleteCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const updateCategory = async (categoryId: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const category = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    revalidateTag('categories');
    return { status: 200, message: 'Category updated successfully!', data: category };
  } catch (e) {
    console.log('[action:updateCategory]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
