'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LengthColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<LengthColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
