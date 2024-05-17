import { StoreNavBar } from '@/components/Layout/StoreNavBar';

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreNavBar />
      {children}
    </>
  );
}
