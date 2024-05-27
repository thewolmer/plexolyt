import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';

interface QueryProps {
  category?: string;
  color?: string[];
  length?: string[];
  width?: string[];
  featured?: string;
}

export async function QueryProducts({ category, color, length, width, featured }: QueryProps) {
  try {
    const categoryId = category || undefined;
    const colorIds = color?.filter((c) => c !== undefined) || [];
    const lengthIds = length?.filter((l) => l !== undefined) || [];
    const widthIds = width?.filter((w) => w !== undefined) || [];
    const isFeatured = featured === 'true' ? true : undefined;

    const products = await db.product.findMany({
      where: {
        categoryId,
        colorId: {
          in: colorIds.length ? colorIds : undefined,
        },
        lengthId: {
          in: lengthIds.length ? lengthIds : undefined,
        },
        widthId: {
          in: widthIds.length ? widthIds : undefined,
        },
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
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
    console.log('[GET : QueryProducts]', e);
    return { message: 'Couldnt fetch products data.', status: 500 };
  }
}

export async function getCheckoutProducts(items: CartItem[]) {
  try {
    const products = await db.product.findMany({
      where: {
        id: {
          in: items.map((item) => item.id),
        },
      },
    });

    return products;
  } catch (e) {
    console.log('[GET : getCheckoutProducts]', e);
    return { message: 'Couldnt fetch checkout products data.', status: 500 };
  }
}
