'use client';
import { Color, Gauge, Length, Width } from '@prisma/client';
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
import { Toggle } from '@/components/ui/toggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

interface Props {
  colors?: Color[];
  lengths?: Length[];
  widths?: Width[];
  gauges?: Gauge[];
}

export const FiltersClient = ({ colors, lengths, widths, gauges }: Props) => {
  const searchParams = useSearchParams();
  const { isMobile } = useMediaQuery();
  const updateSearchParams = useUpdateSearchParams();
  const accordionValues = [colors, lengths, widths, gauges];
  const accordionLabels = ['color', 'length', 'width', 'Gauge'];
  const current = qs.parse(searchParams.toString());

  if (!isMobile) {
    return (
      <div className="mx-auto my-16 min-h-[50vh] w-1/5 max-w-2xl  p-4 sm:mx-6 sm:my-24  lg:px-8">
        <h3 className="mb-2 text-xl font-bold">Filters</h3>
        <Separator />
        <Accordion type="multiple">
          {accordionValues.map((value, index) => (
            <AccordionItem key={index} value={`${index}item`}>
              <AccordionTrigger className="capitalize">{`${accordionLabels[index]}s`}</AccordionTrigger>
              <AccordionContent className=" space-x-2 space-y-2">
                {value && (
                  <>
                    {value.map((item) => (
                      <Toggle
                        key={item.id}
                        value={item.id}
                        pressed={
                          Array.isArray(current[accordionLabels[index]])
                            ? current[accordionLabels[index]]?.includes(item.id.toString())
                            : current[accordionLabels[index]] === item.id.toString()
                        }
                        variant={'outline'}
                        onPressedChange={() =>
                          updateSearchParams(accordionLabels[index] as 'color' | 'length' | 'width' | 'gauge', item.id)
                        }
                      >
                        {item.name}
                      </Toggle>
                    ))}
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
            <Accordion type="multiple" className="px-10">
              {accordionValues.map((value, index) => (
                <AccordionItem key={index} value={`${index}item`}>
                  <AccordionTrigger className="capitalize">{`${accordionLabels[index]}s`}</AccordionTrigger>
                  <AccordionContent className=" space-x-2 space-y-2">
                    {value && (
                      <>
                        {value.map((item) => (
                          <Toggle
                            key={item.id}
                            value={item.id}
                            pressed={
                              Array.isArray(current[accordionLabels[index]])
                                ? current[accordionLabels[index]]?.includes(item.id.toString())
                                : current[accordionLabels[index]] === item.id.toString()
                            }
                            variant={'outline'}
                            onPressedChange={() =>
                              updateSearchParams(
                                accordionLabels[index] as 'color' | 'length' | 'width' | 'gauge',
                                item.id,
                              )
                            }
                          >
                            {item.name}
                          </Toggle>
                        ))}
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
