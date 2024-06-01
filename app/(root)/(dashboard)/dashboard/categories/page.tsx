import React from 'react';

import db from '@/lib/db';

import { CategoriesClient } from './components/client';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async () => {
  const data = await db.category.findMany({
    include: {
      billboard: true,
    },
  });
  const formattedCategory: CategoryColumn[] | undefined = data?.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    textColor: item.textColor,
    updatedAt: item.updatedAt,
  }));
  console.log(formattedCategory);

  return (
    <main>
      <CategoriesClient formattedCategory={formattedCategory} />
    </main>
  );
};

export default CategoriesPage;
