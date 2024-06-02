const headers = {
  Authorization: process.env.AUTH_SECRET as string,
  'Content-Type': 'application/json',
  Referer: process.env.NEXT_PUBLIC_APP_URL as string,
};

export const revalidatePath = (path: string) => {
  console.log('Revalidating path:', path);
  fetch(`${process.env.AUTH_TRUST_HOST}/api/revalidate`, {
    method: 'POST',
    headers: headers,
  });
};
