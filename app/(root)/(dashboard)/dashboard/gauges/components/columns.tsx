'use client';

import { ColumnDef } from '@tanstack/react-table';

import { formatRelatedDate } from '@/utils/formatter';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type GaugeColumn = {
  id: string;
  name: string;
  updatedAt: Date;
};

export const columns: ColumnDef<GaugeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
