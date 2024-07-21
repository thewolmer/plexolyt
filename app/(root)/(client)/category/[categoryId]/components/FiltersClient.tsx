'use client';
import { Color, Gauge, Length, SubCategory, Width } from '@prisma/client';
import { FilterIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

interface Props {
  subCategories?: SubCategory[];
  colors?: Color[];
  lengths?: Length[];
  widths?: Width[];
  gauges?: Gauge[];
}

export const FiltersClient = ({ colors, lengths, widths, gauges, subCategories }: Props) => {
  const { isMobile, isDesktop } = useMediaQuery();

  if (isDesktop) {
    return (
      <div className="mx-auto my-16 min-h-[50vh] w-1/5 max-w-2xl  p-4 sm:mx-6 sm:my-24  lg:px-8">
        <h3 className="mb-2 text-xl font-bold">Filters</h3>
        <Separator />
        <FilterAccordions
          subCategories={subCategories}
          colors={colors}
          lengths={lengths}
          widths={widths}
          gauges={gauges}
        />
      </div>
    );
  }
  if (isMobile)
    return (
      <div className="relative flex w-full items-end justify-end px-8">
        <Drawer>
          <DrawerTrigger
            className={buttonVariants({ variant: 'secondary', size: 'icon', className: 'absolute -bottom-14' })}
          >
            <FilterIcon size={24} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Products</DrawerTitle>
              <DrawerDescription>Filter Products by Color, Length and Width</DrawerDescription>
            </DrawerHeader>
            <FilterAccordions
              subCategories={subCategories}
              colors={colors}
              lengths={lengths}
              widths={widths}
              gauges={gauges}
            />
            <DrawerFooter>
              <DrawerClose>
                <Button className="w-full">Search</Button>
              </DrawerClose>
              <DrawerClose>
                <Button className="w-full" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
};

function FilterAccordions({ colors, lengths, widths, gauges, subCategories }: Props) {
  const accordionValues = [subCategories, colors, lengths, widths, gauges];
  const accordionLabels = ['type', 'color', 'length', 'width', 'Gauge'];
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const current = qs.parse(searchParams.toString());
  return (
    <Accordion type="multiple" className="px-10 md:px-0">
      {accordionValues.map((value, index) => (
        <AccordionItem key={index} value={`${index}item`}>
          <AccordionTrigger className="capitalize">{`${accordionLabels[index]}s`}</AccordionTrigger>
          <AccordionContent className=" space-x-2 space-y-2">
            {value && (
              <>
                {value.map((item) => {
                  const isSelected = Array.isArray(current[accordionLabels[index]])
                    ? current[accordionLabels[index]]?.includes(item.id.toString())
                    : current[accordionLabels[index]] === item.id.toString();
                  return (
                    <Button
                      key={item.id}
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={() =>
                        updateSearchParams(
                          accordionLabels[index] as 'type' | 'color' | 'length' | 'width' | 'gauge',
                          item.id,
                        )
                      }
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
