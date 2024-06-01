/* eslint-disable @typescript-eslint/no-unused-vars */
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const POST = (req: NextRequest) => {
  revalidatePath('/');
  return Response.json({ message: 'Revalidated', status: 200, now: new Date() });
};
