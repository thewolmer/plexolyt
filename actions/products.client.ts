import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';

interface QueryProps {
  category?: string;
  colors?: string[];
  lengths?: string[];
  widths?: string[];
  featured?: string;
}

export async function QueryProducts({ category, colors, lengths, widths, featured }: QueryProps) {
  try {
    const categoryId = category || undefined;
    const colorIds = colors?.filter((c) => c !== undefined) || [];
    const lengthIds = lengths?.filter((l) => l !== undefined) || [];
    const widthIds = widths?.filter((w) => w !== undefined) || [];
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
    if (products.length === 0) return { message: 'No products found.', status: 404 };

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
