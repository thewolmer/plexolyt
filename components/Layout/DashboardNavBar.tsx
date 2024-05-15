'use client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '../ui/button';

import { NavLinks } from './NavLinks';
import { ThemeSwitcher } from './ThemeSwitcher';

export const DashboardNavBar = async () => (
  <>
    <nav className="hidden border-b md:block">
      <div className="flex h-16  items-center px-4">
        Plexolyt Dashboard
        <NavLinks alignment="horizontal" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <Button size={'icon'}>out</Button>
        </div>
      </div>
    </nav>
    <nav className="block border-b md:hidden">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon />
          </SheetTrigger>
          <SheetContent side={'left'} className="h-full w-3/4 pb-40">
            <SheetHeader className="flex  h-full items-center ">
              <SheetTitle></SheetTitle>
              <SheetDescription>
                <NavLinks alignment="vertical" />
              </SheetDescription>
            </SheetHeader>
            <Separator orientation="horizontal" className="mb-10" />
            <div className="flex flex-col items-center justify-end gap-2">
              <div className="flex gap-2 ">
                Plexolyt Dashboard
                <ThemeSwitcher />
              </div>
              <p className="text-center text-xs text-muted-foreground">(c) 2024 Wolmer Studios</p>
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center space-x-4">{/* <UserButton afterSignOutUrl="/" /> */} icon</div>
      </div>
    </nav>
  </>
);
