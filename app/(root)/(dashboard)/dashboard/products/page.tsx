import React from 'react';

import { getAllProducts } from '@/actions/products';
import { formatCurrency } from '@/utils/formatter';

import { ProductClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async () => {
  const { data } = await getAllProducts();
  const formattedProducts: ProductColumn[] | undefined = data?.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    price: formatCurrency(product.price),
    stock: Number(product.stock),
    category: product.category.name,
    subCategory: product.subCategory.name,
    colors: product.productColors.map((item) => item.color.hex),
    lengths: product.productLengths.map((item) => item.length.name),
    widths: product.productWidths.map((item) => item.width.name),
    gauges: product.productGauges.map((item) => item.gauge.name),
    updatedAt: product.updatedAt,
  }));

  return (
    <main>
      <ProductClient formattedProducts={formattedProducts} />
    </main>
  );
};

export default ProductsPage;
