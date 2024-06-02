'use server';

import { env } from '@/env';

export const getCommits = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/thewolmer/plexolyt/commits', {
      headers: {
        Authorization: `Bearer ${env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    return { data, status: 200, message: 'Success' };
  } catch (error) {
    console.error('action:getCommits', error);
    return { status: 400, message: 'Something went wrong!' };
  }
};
