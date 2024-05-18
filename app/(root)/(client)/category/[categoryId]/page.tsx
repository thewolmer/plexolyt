import React from 'react';

import { Billboard } from './components/Billboard';
import ProductList from './components/ProductList';

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => (
  <div>
    <Billboard id={params.categoryId} />
    <ProductList id={params.categoryId} />
  </div>
);

export default CategoryPage;
