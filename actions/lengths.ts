'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { lengthFormSchema as formSchema } from '@/prisma/form-schema';
import { revalidatePath } from '@/utils/Revalidate';

export const getAllLengths = async () => {
  try {
    const length = await db.length.findMany({});
    return { status: 200, data: length };
  } catch (e) {
    console.log('[action:getAllLengths]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getLengthByID = async (lengthID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const length = await db.length.findUnique({
      where: {
        id: lengthID,
      },
    });
    return { status: 200, message: 'Length created successfully!', data: length };
  } catch (e) {
    console.log('[action:getAllLengthByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createLength = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const length = await db.length.create({
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Length created successfully!', data: length };
  } catch (e) {
    console.log('[action:createLength]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteLength = async (lengthID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!lengthID) return { message: 'Invalid length ID!', status: 400 };
  try {
    const length = await db.length.delete({
      where: {
        id: lengthID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Length deleted successfully!', data: length };
  } catch (e) {
    console.log('[action:deleteLength]', e);
    return { message: 'This length is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateLength = async (lengthID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const length = await db.length.update({
      where: {
        id: lengthID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Length updated successfully!', data: length };
  } catch (e) {
    console.log('[action:updateLength]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
