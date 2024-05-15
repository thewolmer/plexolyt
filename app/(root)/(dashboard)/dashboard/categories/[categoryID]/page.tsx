import React from 'react';

import { getAllBillboards } from '@/actions/billboards';
import { getCategoryByID } from '@/actions/categories';

import { CategoryForm } from './components/CategoryForm';

const CategoryPage = async ({ params }: { params: { categoryID: string } }) => {
  const category = await getCategoryByID(params.categoryID);
  const billboards = await getAllBillboards();
  return (
    <main>
      <CategoryForm initialValues={category.data} billboards={billboards?.data} />
    </main>
  );
};

export default CategoryPage;
