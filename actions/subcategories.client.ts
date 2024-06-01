import db from '@/lib/db';

export const getAllSubCategories = async () => {
  try {
    const subcategory = await db.subCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 200, data: subcategory };
  } catch (e) {
    console.log('[action-client:getAllSubCategories]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
