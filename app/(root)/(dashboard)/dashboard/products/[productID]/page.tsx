import React from 'react';

import { getAllCategories } from '@/actions/categories';
import { getAllColors } from '@/actions/colors';
import { getAllGauges } from '@/actions/gauges';
import { getAllLengths } from '@/actions/lengths';
import { getProductByID } from '@/actions/products';
import { getAllWidths } from '@/actions/widths';

import { ProductForm } from './components/ProductForm';

const ProductPage = async ({ params }: { params: { productID: string } }) => {
  const [product, categories, colors, lengths, widths, gauges] = await Promise.all([
    getProductByID({ productID: params.productID, include: { images: true } }),
    getAllCategories(),
    getAllColors(),
    getAllLengths(),
    getAllWidths(),
    getAllGauges(),
  ]);
  return (
    <main>
      <ProductForm
        initialValues={product.data}
        categories={categories.data}
        colors={colors.data}
        lengths={lengths.data}
        widths={widths.data}
        gauges={gauges.data}
      />
    </main>
  );
};

export default ProductPage;
