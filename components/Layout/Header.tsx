import React from 'react';

import { Separator } from '@/components/ui/separator';

export const Header = ({ title, description }: { title: string; description: string }) => (
  <div className="h-[10vh] w-full  p-10 ">
    <h1 className="text-3xl font-extrabold">{title}</h1>
    <p className="text-sm text-muted-foreground">{description}</p>
    <Separator className="my-4" />
  </div>
);
