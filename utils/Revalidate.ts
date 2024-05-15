export const revalidatePath = (path: string) => {
  console.log('Revalidating path:', path);
  fetch(`${process.env.AUTH_TRUST_HOST}/api/revalidate`, {
    method: 'POST',
  });
};
