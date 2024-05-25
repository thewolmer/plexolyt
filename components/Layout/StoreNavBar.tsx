'use client';

import { Cart } from '@/components/Layout/Cart';
import { StoreNavLinks } from '@/components/Layout/StoreNavLinks';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';

export const StoreNavBar = () => (
  <>
    <nav className="block border-b ">
      <div className="flex h-16 items-center gap-2 px-2 text-xs md:gap-5 md:px-4 md:text-base">
        Plexolyt
        <StoreNavLinks />
        <div className="ml-auto flex items-center">
          <Link href="/for-sellers" className={buttonVariants({ size: 'sm' })}>
            For Sellers
          </Link>
          <Cart />
        </div>
      </div>
    </nav>
  </>
);
