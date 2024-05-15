import { DashboardNavBar } from '@/components/Layout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardNavBar />
      {children}
    </>
  );
}

export const dynamic = 'force-dynamic';
