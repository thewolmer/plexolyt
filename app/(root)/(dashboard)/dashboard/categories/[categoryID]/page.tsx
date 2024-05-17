import React from 'react';

import { getAllBillboards } from '@/actions/billboards';
import db from '@/lib/db';

import { CategoryForm } from './components/CategoryForm';

const CategoryPage = async ({ params }: { params: { categoryID: string } }) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryID,
    },
    include: {
      billboard: true,
    },
  });
  const billboards = await getAllBillboards();
  return (
    <main>
      <CategoryForm initialValues={category} billboards={billboards?.data} />
    </main>
  );
};

export default CategoryPage;
