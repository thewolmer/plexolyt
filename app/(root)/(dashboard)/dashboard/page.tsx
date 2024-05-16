import React from 'react';

import { auth } from '@/auth';
import { Header } from '@/components/Layout/Header';

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      <Header title="Overview" description={`Welcome back, ${session?.user?.name} 👋`}></Header>
      <p> User: {session?.user?.name} </p>
    </div>
  );
};

export default DashboardPage;
