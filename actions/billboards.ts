'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';

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

export const createBillboard = async (formData: { label: string; imageUrl: string }) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const formSchema = z.object({
      label: z.string().min(2).max(50),
      imageUrl: z.string().min(2),
    });
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
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const updateBillboard = async (billboardID: string, formData: { label: string; imageUrl: string }) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const formSchema = z.object({
      label: z.string().min(2).max(50),
      imageUrl: z.string().min(2),
    });
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
