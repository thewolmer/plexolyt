'use client';

import { ColumnDef } from '@tanstack/react-table';

import { formatRelatedDate } from '@/utils/formatter';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  textColor: string;
  updatedAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'Billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'textColor',
    header: 'Text Color',
    cell: ({ row }) => <div className="h-3 w-3 rounded-full" style={{ background: row.original.textColor }}></div>,
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
