import { env } from '@/env';

const headers = {
  Authorization: env.AUTH_SECRET as string,
  'Content-Type': 'application/json',
  Referer: env.NEXT_PUBLIC_APP_URL as string,
};

export const revalidatePath = (path: string) => {
  console.log('Revalidating path:', path);
  fetch(`${env.AUTH_TRUST_HOST}/api/revalidate`, {
    method: 'POST',
    headers: headers,
  });
};
