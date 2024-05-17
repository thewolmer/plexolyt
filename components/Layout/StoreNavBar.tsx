'use client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { NavLinks } from '@/components/Layout/NavLinks';
import { ThemeSwitcher } from '@/components/Layout/ThemeSwitcher';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Link } from '../Link';

import { StoreNavLinks } from './StoreNavLinks';

export const StoreNavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="hidden border-b md:block">
        <div className="flex h-16  items-center gap-5 px-4">
          Plexolyt
          <StoreNavLinks />
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/for-sellers" className={buttonVariants()}>
              For Sellers
            </Link>
            <div>Cart</div>
          </div>
        </div>
      </nav>
    </>
  );
};
