'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { colorFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllColors = async () => {
  try {
    const color = await db.color.findMany({});
    return { status: 200, data: color };
  } catch (e) {
    console.log('[action:getAllColors]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getColorByID = async (colorID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const color = await db.color.findUnique({
      where: {
        id: colorID,
      },
    });
    return { status: 200, message: 'Color created successfully!', data: color };
  } catch (e) {
    console.log('[action:getAllColorByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createColor = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const color = await db.color.create({
      data: {
        id: slugify(parsedData.name),
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Color created successfully!', data: color };
  } catch (e) {
    console.log('[action:createColor]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteColor = async (colorID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!colorID) return { message: 'Invalid color ID!', status: 400 };
  try {
    const color = await db.color.delete({
      where: {
        id: colorID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Color deleted successfully!', data: color };
  } catch (e) {
    console.log('[action:deleteColor]', e);
    return { message: 'This color is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateColor = async (colorID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const color = await db.color.update({
      where: {
        id: colorID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Color updated successfully!', data: color };
  } catch (e) {
    console.log('[action:updateColor]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
