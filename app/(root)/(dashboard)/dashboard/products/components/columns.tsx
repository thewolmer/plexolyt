'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  colors: string[];
  lengths: string[];
  gauges: string[];
  widths: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  // {
  //   accessorKey: 'color',
  //   header: 'Color',
  //   cell: ({ row }) => {
  //     row.original.colors.map((color, index) => <Badge key={index}> {color}</Badge>);
  //   },
  // },

  {
    accessorKey: 'isFeatured',
    header: 'Featured?',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived?',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
