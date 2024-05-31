'use client';

import { Cart } from '@/components/Cart/Cart';
import { Image } from '@/components/Image';
import { StoreNavLinks } from '@/components/Layout/StoreNavLinks';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';

export const StoreNavBar = () => (
  <>
    <nav className="flex h-16 w-full justify-between  border-b px-2 md:px-4">
      <div className="flex items-center gap-1 md:gap-5">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold">
          <Image src="/images/logo/logo.jpg" height={40} width={40} alt="logo" className="rounded-full" />
          <span className="hidden md:block">Plexolyt</span>
        </Link>
        <StoreNavLinks />
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/for-wholesaler"
          className={buttonVariants({ size: 'sm', variant: 'outline', className: 'text-xs md:text-base' })}
        >
          For Wholesaler
        </Link>
        <Cart />
      </div>
    </nav>
  </>
);
