export const revalidatePath = (path: string) => {
  console.log('Revalidating path:', path);
  fetch('/api/revalidate', {
    method: 'POST',
  });
};
