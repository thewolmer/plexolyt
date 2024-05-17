'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { billboardFormSchema as formSchema } from '@/prisma/form-schema';
import { revalidatePath } from '@/utils/Revalidate';

export const getAllBillboards = async () => {
  try {
    const billboard = await db.billboard.findMany({});
    return { status: 200, data: billboard };
  } catch (e) {
    console.log('[action:getAllBillboards]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getBillboardByID = async (billboardID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const billboard = await db.billboard.findUnique({
      where: {
        id: billboardID,
      },
    });
    return { status: 200, message: 'Billboard created successfully!', data: billboard };
  } catch (e) {
    console.log('[action:getAllBillboardByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createBillboard = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const billboard = await db.billboard.create({
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Billboard created successfully!', data: billboard };
  } catch (e) {
    console.log('[action:createBillboard]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteBillboard = async (billboardID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!billboardID) return { message: 'Invalid billboard ID!', status: 400 };
  try {
    const billboard = await db.billboard.delete({
      where: {
        id: billboardID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Billboard deleted successfully!', data: billboard };
  } catch (e) {
    console.log('[action:deleteBillboard]', e);
    return { message: 'This billboard is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateBillboard = async (billboardID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const billboard = await db.billboard.update({
      where: {
        id: billboardID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Billboard updated successfully!', data: billboard };
  } catch (e) {
    console.log('[action:updateBillboard]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
