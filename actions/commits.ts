export const getCommits = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/thewolmer/plexolyt/commits', {
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    const data = await response.json();
    return { data, status: 200, message: 'Success' };
  } catch (error) {
    console.error('action:getCommits', error);
    return { status: 400, message: 'Something went wrong!' };
  }
};
