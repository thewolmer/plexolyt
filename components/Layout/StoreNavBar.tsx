'use client';

import { buttonVariants } from '@/components/ui/button';

import { Link } from '../Link';

import { Cart } from './Cart';
import { StoreNavLinks } from './StoreNavLinks';

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
