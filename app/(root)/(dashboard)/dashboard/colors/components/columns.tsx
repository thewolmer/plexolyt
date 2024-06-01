'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { formatRelatedDate } from '@/utils/formatter';

import { CellActions } from './cell-actions';

export type ColorColumn = {
  id: string;
  name: string;
  hex: string;
  updatedAt: Date;
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
    cell: ({ row }) => <div className={cn('size-4 rounded-full border')} style={{ background: row.original.hex }} />,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => formatRelatedDate(row.original.updatedAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
