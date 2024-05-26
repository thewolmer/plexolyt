import { Footer, StoreNavBar } from '@/components/Layout';

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreNavBar />
      {children}
      <Footer />
    </>
  );
}
