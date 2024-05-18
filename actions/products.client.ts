import db from '@/lib/db';

interface QueryProps {
  category?: string;
  color?: string;
  length?: string;
  width?: string;
  featured?: string;
}

export async function QueryProducts({ category, color, length, width, featured }: QueryProps) {
  try {
    const categoryId = category || undefined;
    const colorId = color || undefined;
    const lengthId = length || undefined;
    const widthId = width || undefined;
    const isFeatured = featured;

    const products = await db.product.findMany({
      where: {
        categoryId,
        colorId,
        lengthId,
        widthId,
        isFeatured: isFeatured === 'true' ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        color: true,
        length: true,
        width: true,
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { data: products, status: 200 };
  } catch (e) {
    console.log('[GET /api/v1/products]', e);
    return { message: 'Couldnt fetch products data.', status: 500 };
  }
}
