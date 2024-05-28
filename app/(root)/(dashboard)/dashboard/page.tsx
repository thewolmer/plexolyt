import { DollarSign } from 'lucide-react';
import React from 'react';

import { getProductsCount, getSalesCount, getTotalRevenue } from '@/actions/dashboard';
import { auth } from '@/auth';
import { PackageIcon, ShirtIcon } from '@/components/Icons';
import { Header } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatter';

const DashboardPage = async () => {
  const [session, totalRevenue, salesCount, productsCount] = await Promise.all([
    auth(),
    getTotalRevenue(),
    getSalesCount(),
    getProductsCount(),
  ]);

  return (
    <div>
      <Header title="Overview" description={`Welcome back, ${session?.user?.name} 👋`}></Header>
      <section className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-10 md:p-0">
        <Card>
          <CardHeader className="flex flex-col-reverse items-center justify-between text-sm md:flex-row">
            <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground" size={26} />
          </CardHeader>
          <CardContent className="font-bold">
            <div>{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col-reverse items-center justify-between text-sm md:flex-row">
            <CardTitle className="text-base font-medium">Sales</CardTitle>
            <PackageIcon className="text-muted-foreground" />
          </CardHeader>
          <CardContent className="font-bold">
            <div>+{salesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col-reverse items-center justify-between text-sm md:flex-row">
            <CardTitle className="text-base font-medium">Products in Store</CardTitle>
            <ShirtIcon className="text-muted-foreground" />
          </CardHeader>
          <CardContent className="font-bold">
            <div>{productsCount}</div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
