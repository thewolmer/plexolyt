'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { productFormSchema as formSchema } from '@/prisma/form-schema.client';
import { revalidatePath } from '@/utils/Revalidate';
import { slugify } from '@/utils/Slugify';

export const getAllProducts = async () => {
  try {
    const product = await db.product.findMany({
      include: {
        category: true,
        subCategory: true,
        productColors: {
          include: {
            color: true,
          },
        },
        productLengths: {
          include: {
            length: true,
          },
        },
        productWidths: {
          include: {
            width: true,
          },
        },
        productGauges: {
          include: {
            gauge: true,
          },
        },
        images: true,
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
}

export const getProductByID = async ({ productID }: GetProductsByIdProps) => {
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
        category: true,
        subCategory: true,
        productColors: {
          include: {
            color: true,
          },
        },
        productLengths: {
          include: {
            length: true,
          },
        },
        productWidths: {
          include: {
            width: true,
          },
        },
        productGauges: {
          include: {
            gauge: true,
          },
        },
        images: true,
      },
    });
    return { status: 200, message: 'Product retrieved successfully!', data: product };
  } catch (e) {
    console.log('[action:getProductByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export const createProduct = async (formData: z.infer<typeof formSchema>) => {
  console.log('TYpe of price and stock', typeof formData.price, typeof formData.stock);
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    // Parse and validate form data
    const parsedData = formSchema.parse(formData);
    if (parsedData instanceof Error) {
      return { message: 'Invalid form data!', status: 400 };
    }

    // Create product
    const product = await db.product.create({
      data: {
        id: slugify(parsedData.name),
        name: parsedData.name,
        description: parsedData.description,
        price: Number(parsedData.price),
        stock: Number(parsedData.stock),
        categoryId: parsedData.categoryId,
        subCategoryId: parsedData.subCategoryId,
        isArchived: parsedData.isArchived,
        isFeatured: parsedData.isFeatured,
        images: {
          createMany: {
            data: parsedData.images.map((image) => ({ imageUrl: image.url })),
          },
        },
      },
    });

    // Create product-color relationships
    if (parsedData.colorIds && parsedData.colorIds.length > 0) {
      await db.productColor.createMany({
        data: parsedData.colorIds.map((color) => ({
          productId: product.id,
          colorId: color.value,
        })),
      });
    }

    // Create product-length relationships
    if (parsedData.lengthIds && parsedData.lengthIds.length > 0) {
      await db.productLength.createMany({
        data: parsedData.lengthIds.map((length) => ({
          productId: product.id,
          lengthId: length.value,
        })),
      });
    }

    // Create product-width relationships
    if (parsedData.widthIds && parsedData.widthIds.length > 0) {
      await db.productWidth.createMany({
        data: parsedData.widthIds.map((width) => ({
          productId: product.id,
          widthId: width.value,
        })),
      });
    }

    // Create product-gauge relationships
    if (parsedData.gaugeIds && parsedData.gaugeIds.length > 0) {
      await db.productGauge.createMany({
        data: parsedData.gaugeIds.map((gauge) => ({
          productId: product.id,
          gaugeId: gauge.value,
        })),
      });
    }

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
        price: formData.price as number,
        stock: formData.stock as number,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
        isArchived: formData.isArchived,
        isFeatured: formData.isFeatured,
        productColors: {
          deleteMany: {}, // Delete existing relations
          create: formData.colorIds.map((color) => ({ colorId: color.value })),
        },
        productLengths: {
          deleteMany: {},
          create: formData.lengthIds.map((length) => ({ lengthId: length.value })),
        },
        productWidths: {
          deleteMany: {},
          create: formData.widthIds.map((width) => ({ widthId: width.value })),
        },
        productGauges: {
          deleteMany: {},
          create: formData.gaugeIds.map((gauge) => ({ gaugeId: gauge.value })),
        },
        images: {
          deleteMany: {}, // Delete existing images
          create: formData.images.map((image) => ({ imageUrl: image.url })), // Create new images
        },
      },
    });
    revalidatePath('/');
    return { status: 200, message: 'Product updated successfully!', data: product };
  } catch (e) {
    console.log('[action:updateProduct]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
