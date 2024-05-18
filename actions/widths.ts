'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { widthFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllWidths = async () => {
  try {
    const width = await db.width.findMany({});
    return { status: 200, data: width };
  } catch (e) {
    console.log('[action:getAllWidths]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getWidthByID = async (widthID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const width = await db.width.findUnique({
      where: {
        id: widthID,
      },
    });
    return { status: 200, message: 'Width created successfully!', data: width };
  } catch (e) {
    console.log('[action:getAllWidthByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createWidth = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const width = await db.width.create({
      data: {
        id: slugify(parsedData.name),
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Width created successfully!', data: width };
  } catch (e) {
    console.log('[action:createWidth]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteWidth = async (widthID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!widthID) return { message: 'Invalid width ID!', status: 400 };
  try {
    const width = await db.width.delete({
      where: {
        id: widthID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Width deleted successfully!', data: width };
  } catch (e) {
    console.log('[action:deleteWidth]', e);
    return { message: 'This width is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateWidth = async (widthID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const width = await db.width.update({
      where: {
        id: widthID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Width updated successfully!', data: width };
  } catch (e) {
    console.log('[action:updateWidth]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
