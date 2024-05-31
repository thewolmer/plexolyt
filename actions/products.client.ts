import { unstable_cache as cache } from 'next/cache';

import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';

interface QueryProps {
  category?: string;
  subCategory?: string[];
  colors?: string[];
  lengths?: string[];
  widths?: string[];
  gauges?: string[];
  featured?: string;
}

export const getProductsByCategory = async (categoryId: string) => {
  try {
    const product = await db.product.findMany({
      where: {
        categoryId,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 200, data: product };
  } catch (e) {
    console.log('[action:getProductsByCategoryId]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

export async function QueryProducts({ category, subCategory, colors, lengths, widths, gauges, featured }: QueryProps) {
  try {
    const categoryId = category || undefined;
    const subCategoryIds = subCategory?.filter((s) => s !== undefined) || [];
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
          subCategoryIds.length
            ? {
                subCategory: {
                  id: {
                    in: subCategoryIds,
                  },
                },
              }
            : {},
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

export async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    const relatedProducts = await db.product.findMany({
      where: {
        categoryId,
        isArchived: false,
        id: {
          not: currentProductId,
        },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (relatedProducts.length === 0) return { message: 'No related products found.', status: 404 };

    return { data: relatedProducts, status: 200 };
  } catch (e) {
    console.log('[GET : getRelatedProducts]', e);
    return { message: "Couldn't fetch related products data.", status: 500 };
  }
}

export const getProductById = cache(
  async (id: string) => {
    try {
      const product = await db.product.findUnique({
        where: {
          id,
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

      if (!product) return { message: 'Product not found.', status: 404 };
      return { data: product, status: 200 };
    } catch (e) {
      console.log('[GET : getProductById]', e);
      return { message: "Couldn't fetch product data.", status: 500 };
    }
  },
  ['getProductById'],
  {
    revalidate: 3600,
  },
);
