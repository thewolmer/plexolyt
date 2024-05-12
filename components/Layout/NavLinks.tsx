'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

import { DashboardIcon, PackageIcon, SettingsIcon, ShirtIcon } from '@/components/Icons';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NavLinks = ({ alignment = 'horizontal' }: { alignment: 'horizontal' | 'vertical' }) => {
  const pathname = usePathname();
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

  return (
    <div>
      <ul className={cn('flex items-center gap-4 px-4', alignment === 'vertical' && 'w-full flex-col ')}>
        {links.map((link) => (
          <Link
            href={link.href}
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
            )}{' '}
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
