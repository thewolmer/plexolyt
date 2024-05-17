'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

import {
  BillboardIcon,
  DashboardEditIcon,
  DashboardIcon,
  DiameterIcon,
  PackageIcon,
  PaintBoardIcon,
  SettingsIcon,
  ShirtIcon,
  TapeMeasureIcon,
} from '@/components/Icons';
import { CategoryIcon } from '@/components/Icons/CategoryIcon';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const NavLinks = ({
  alignment = 'horizontal',
  onClose,
}: {
  alignment: 'horizontal' | 'vertical';
  onClose?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const links = [
    {
      label: 'Dashboard',
      href: `/dashboard`,
      icon: DashboardIcon,
    },
    {
      label: 'Products',
      href: `/dashboard/products`,
      icon: ShirtIcon,
    },
    {
      label: 'Orders',
      href: `/dashboard/orders`,
      icon: PackageIcon,
    },
    {
      label: 'Settings',
      href: `/dashboard/settings`,
      icon: SettingsIcon,
    },
  ];

  const attributeLinks = [
    {
      label: 'Billboards',
      href: `/dashboard/billboards`,
      icon: BillboardIcon,
    },
    {
      label: 'Categories',
      href: `/dashboard/categories`,
      icon: CategoryIcon,
    },
    {
      label: 'Colors',
      href: `/dashboard/colors`,
      icon: PaintBoardIcon,
    },
    {
      label: 'Lengths',
      href: `/dashboard/lengths`,
      icon: TapeMeasureIcon,
    },
    {
      label: 'Widths',
      href: `/dashboard/widths`,
      icon: DiameterIcon,
    },
  ];

  return (
    <div>
      <ul className={cn('flex items-center gap-4 px-4', alignment === 'vertical' && 'w-full flex-col ')}>
        {links.map((link) => (
          <Link
            href={link.href}
            onClick={() => onClose && onClose(false)}
            className={cn(
              'w-full gap-2',
              alignment === 'vertical' && 'w-full text-start',
              pathname === link.href ? 'text-foreground' : 'text-muted-foreground',
              buttonVariants({
                variant: 'outline',
                className: pathname === link.href && 'bg-muted',
              }),
            )}
            key={link.label}
          >
            {link.icon && (
              <link.icon
                className={cn('h-5 w-5', pathname === link.href ? 'text-foreground' : 'text-muted-foreground')}
              />
            )}
            {link.label}
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'w-full gap-2',
              alignment === 'vertical' && 'w-full text-start',
              'text-muted-foreground',
              buttonVariants({
                variant: 'outline',
              }),
            )}
          >
            <DashboardEditIcon className="h-5 w-5" /> Edit Store
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuLabel>Edit Property</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {attributeLinks.map((link) => (
              <DropdownMenuItem
                onClick={() => {
                  router.push(link.href);
                  onClose && onClose(false);
                }}
                className={cn(
                  'gap-2',
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground',
                  pathname === link.href && 'bg-muted/50',
                )}
                key={link.label}
              >
                {link.icon && (
                  <link.icon
                    className={cn('h-5 w-5', pathname === link.href ? 'text-foreground' : 'text-muted-foreground')}
                  />
                )}{' '}
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </div>
  );
};
