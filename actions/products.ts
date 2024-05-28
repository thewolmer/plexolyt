'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { productFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

type GetAllProductProps = {
  include: {
    category?: boolean;
    color?: boolean;
    length?: boolean;
    width?: boolean;
    images?: boolean;
    gauge?: boolean;
  };
};

export const getAllProducts = async ({ include }: GetAllProductProps) => {
  try {
    const product = await db.product.findMany({
      include: {
        ...include,
      },
    });
    return { status: 200, data: product };
  } catch (e) {
    console.log('[action:getAllProducts]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

interface GetProductsByIdProps {
  productID: string;
  include?: {
    category?: boolean;
    color?: boolean;
    length?: boolean;
    width?: boolean;
    images?: boolean;
  };
}

export const getProductByID = async ({ productID, include }: GetProductsByIdProps) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const product = await db.product.findUnique({
      where: {
        id: productID,
      },
      include: {
        ...include,
      },
    });
    return { status: 200, message: 'Product created successfully!', data: product };
  } catch (e) {
    console.log('[action:getAllProductByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createProduct = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const product = await db.product.create({
      data: {
        id: slugify(formData.name),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        categoryId: formData.categoryId,
        colorId: formData.colorId,
        lengthId: formData.lengthId,
        widthId: formData.widthId,
        gaugeId: formData.gaugeId,
        isArchived: formData.isArchived,
        isFeatured: formData.isFeatured,
        images: {
          createMany: {
            data: [...formData.images.map((image) => ({ imageUrl: image.url }))],
          },
        },
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Product created successfully!', data: product };
  } catch (e) {
    console.log('[action:createProduct]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const deleteProduct = async (productID: string) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  if (!productID) return { message: 'Invalid product ID!', status: 400 };
  try {
    const product = await db.product.delete({
      where: {
        id: productID,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Product deleted successfully!', data: product };
  } catch (e) {
    console.log('[action:deleteProduct]', e);
    return { message: 'This product is related to some other entity. This cant be deleted.', status: 500 };
  }
};

export const updateProduct = async (productID: string, formData: z.infer<typeof formSchema>) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const product = await db.product.update({
      where: {
        id: productID,
      },
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        categoryId: formData.categoryId,
        colorId: formData.colorId,
        lengthId: formData.lengthId,
        widthId: formData.widthId,
        gaugeId: formData.gaugeId,
        isArchived: formData.isArchived,
        isFeatured: formData.isFeatured,
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Product updated successfully!', data: product };
  } catch (e) {
    console.log('[action:updateProduct]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
