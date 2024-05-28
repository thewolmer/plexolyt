import { format } from 'date-fns/format';
import React from 'react';

import { getAllSubCategories } from '@/actions/subcategories';

import { SubCategoryClient } from './components/client';
import { SubCategoryColumn } from './components/columns';

const SubCategoriesPage = async () => {
  const { data } = await getAllSubCategories();
  const formattedSubCategories: SubCategoryColumn[] | undefined = data?.map((subcategory) => ({
    id: subcategory.id,
    name: subcategory.name,
    createdAt: format(subcategory.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <SubCategoryClient formattedSubCategories={formattedSubCategories} />
    </main>
  );
};

export default SubCategoriesPage;
