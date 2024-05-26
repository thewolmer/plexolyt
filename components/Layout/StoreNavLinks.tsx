'use client';

import { Category } from '@prisma/client';
import Link from 'next/link';
import * as React from 'react';

// Add the missing import for InternalLinkProps
import { getAllCategories } from '@/actions/categories';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function StoreNavLinks() {
  const [categories, setCategories] = React.useState<Category[] | undefined>([]);

  React.useEffect(() => {
    async function fetchData() {
      const categories = await getAllCategories();
      setCategories(categories.data);
    }
    fetchData();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="md:text-base">Search by Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-green-400 bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/#featured"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Best Selling</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explore the best selling products on our store.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {!categories && (
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="flex h-11  items-center justify-center p-3 py-8" />
                  ))}
                </>
              )}
              {categories?.length === 0 && (
                <>
                  <p className="text-center">No categories.</p>
                </>
              )}

              {categories?.map((category) => (
                <ListItem key={category.id} href={`/category/${category.id}`} title={category.name}>
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Search</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {/* <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  // eslint-disable-next-line react/prop-types
  ({ className, title, children, ...props }, ref) => (
    <li>
      <Link
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        // eslint-disable-next-line react/prop-types
        href={props.href ?? ''}
        {...props}
      >
        <div className="text-sm font-medium leading-none ">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </Link>
    </li>
  ),
);
ListItem.displayName = 'ListItem';
