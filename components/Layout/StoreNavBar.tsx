'use client';

import { Cart } from '@/components/Cart/Cart';
import { StoreNavLinks } from '@/components/Layout/StoreNavLinks';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';

export const StoreNavBar = () => (
  <>
    <nav className="flex h-16 w-full justify-between  border-b px-2 md:px-4">
      <div className="flex items-center gap-1 md:gap-5">
        <Link href="/" className="font-bold">
          Plexolyt
        </Link>
        <StoreNavLinks />
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/for-sellers"
          className={buttonVariants({ size: 'sm', variant: 'outline', className: 'text-xs md:text-base' })}
        >
          For Sellers
        </Link>
        <Cart />
      </div>
    </nav>
  </>
);
