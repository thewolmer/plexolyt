import { revalidatePath } from 'next/cache';

export const POST = (req) => {
  revalidatePath('/');
  return Response.json({ message: 'Revalidated', status: 200 });
};
