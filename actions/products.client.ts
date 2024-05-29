import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';

interface QueryProps {
  category?: string;
  colors?: string[];
  lengths?: string[];
  widths?: string[];
  gauges?: string[];
  featured?: string;
}

export async function QueryProducts({ category, colors, lengths, widths, gauges, featured }: QueryProps) {
  try {
    const categoryId = category || undefined;
    const colorIds = colors?.filter((c) => c !== undefined) || [];
    const lengthIds = lengths?.filter((l) => l !== undefined) || [];
    const widthIds = widths?.filter((w) => w !== undefined) || [];
    const gaugeIds = gauges?.filter((g) => g !== undefined) || [];
    const isFeatured = featured === 'true' ? true : undefined;

    const products = await db.product.findMany({
      where: {
        categoryId,
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
        isArchived: false,
        AND: [
          colorIds.length
            ? {
                productColors: {
                  some: {
                    colorId: {
                      in: colorIds,
                    },
                  },
                },
              }
            : {},
          lengthIds.length
            ? {
                productLengths: {
                  some: {
                    lengthId: {
                      in: lengthIds,
                    },
                  },
                },
              }
            : {},
          widthIds.length
            ? {
                productWidths: {
                  some: {
                    widthId: {
                      in: widthIds,
                    },
                  },
                },
              }
            : {},
          gaugeIds.length
            ? {
                productGauges: {
                  some: {
                    gaugeId: {
                      in: gaugeIds,
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        category: true,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (products.length === 0) return { message: 'No products found.', status: 404 };

    return { data: products, status: 200 };
  } catch (e) {
    console.log('[GET : QueryProducts]', e);
    return { message: "Couldn't fetch products data.", status: 500 };
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
    return { message: "Couldn't fetch checkout products data.", status: 500 };
  }
}
