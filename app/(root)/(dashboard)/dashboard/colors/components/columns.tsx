'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import { CellActions } from './cell-actions';

export type ColorColumn = {
  id: string;
  name: string;
  hex: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'hex',
    header: 'Hex',
  },

  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => <div className={cn('size-4 rounded-full')} style={{ background: row.original.hex }} />,
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
