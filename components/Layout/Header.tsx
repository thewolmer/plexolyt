import React from 'react';

import { Separator } from '@/components/ui/separator';

export const Header = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <>
    <div className="mx-auto flex h-[10vh] w-full max-w-7xl justify-between p-10">
      <div>
        <h1 className=" text-xl font-extrabold md:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
    <Separator className="my-6" />
  </>
);
