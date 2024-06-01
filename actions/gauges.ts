'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { gaugeFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllGauges = async () => {
  try {
    const gauge = await db.gauge.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 200, data: gauge };
  } catch (e) {
    console.log('[action:getAllGauges]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const getGaugeByID = async (gaugeID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const gauge = await db.gauge.findUnique({
      where: {
        id: gaugeID,
      },
    });
    return { status: 200, message: 'Gauge created successfully!', data: gauge };
  } catch (e) {
    console.log('[action:getAllGaugeByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createGauge = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const gauge = await db.gauge.create({
      data: {
        id: slugify(parsedData.name),
        ...parsedData,
      },
    });
    revalidatePath('/');
    revalidateTag('entities');
    return { status: 200, message: 'Gauge created successfully!', data: gauge };
  } catch (e) {
    console.log('[action:createGauge]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteGauge = async (gaugeID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!gaugeID) return { message: 'Invalid gauge ID!', status: 400 };
  try {
    const gauge = await db.gauge.delete({
      where: {
        id: gaugeID,
      },
    });
    revalidatePath('/');
    revalidateTag('entities');
    return { status: 200, message: 'Gauge deleted successfully!', data: gauge };
  } catch (e) {
    console.log('[action:deleteGauge]', e);
    return { message: 'This gauge is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateGauge = async (gaugeID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }
    const gauge = await db.gauge.update({
      where: {
        id: gaugeID,
      },
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
    revalidateTag('entities');
    return { status: 200, message: 'Gauge updated successfully!', data: gauge };
  } catch (e) {
    console.log('[action:updateGauge]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
