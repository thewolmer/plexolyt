import { format } from 'date-fns/format';
import React from 'react';

import { getAllProducts } from '@/actions/products';
import { formatCurrency } from '@/utils/formatter';

import { ProductClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async () => {
  const { data } = await getAllProducts({ include: { category: true, color: true, length: true, width: true } });
  const formattedProducts: ProductColumn[] | undefined = data?.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    price: formatCurrency(product.price),
    stock: Number(product.stock),
    category: product.category.name,
    color: product.color.hex,
    length: product.length.name,
    width: product.width.name,
    createdAt: format(product.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <ProductClient formattedProducts={formattedProducts} />
    </main>
  );
};

export default ProductsPage;
