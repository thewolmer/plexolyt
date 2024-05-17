'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  color: string;
  length: string;
  width: string;
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
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => <div style={{ backgroundColor: row.original.color }} className="size-5 rounded-full" />,
  },

  {
    accessorKey: 'width',
    header: 'Width',
  },
  {
    accessorKey: 'length',
    header: 'Length',
  },

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
