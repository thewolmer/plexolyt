import React from 'react';

import { auth } from '@/auth';

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p> {session?.user?.name}</p>
    </div>
  );
};

export default DashboardPage;
