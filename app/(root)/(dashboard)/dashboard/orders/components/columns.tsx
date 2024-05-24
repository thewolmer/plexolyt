'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { CellActions } from './cell-actions';

export type OrderColumn = {
  id: string;
  stripeId: string;
  name: string;
  postal_code: string;
  orderItemNames: string;
  payment_status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};
export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'orderItemNames',
    header: 'Items',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'payment_status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
