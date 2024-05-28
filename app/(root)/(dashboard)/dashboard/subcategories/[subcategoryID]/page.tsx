import React from 'react';

import { getSubCategoryByID } from '@/actions/subcategories';

import { SubCategoryForm } from './components/SubCategoryForm';

const SubCategoryPage = async ({ params }: { params: { subcategoryID: string } }) => {
  const subcategory = await getSubCategoryByID(params.subcategoryID);
  return (
    <main>
      <SubCategoryForm initialValues={subcategory.data} />
    </main>
  );
};

export default SubCategoryPage;
