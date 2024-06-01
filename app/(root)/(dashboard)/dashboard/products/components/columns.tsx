'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ToolTip } from '@/components/ui/ToolTip';
import { formatRelatedDate } from '@/utils/formatter';

import { CellActions } from './cell-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  subCategory: string;
  colors: string[];
  lengths: string[];
  gauges: string[];
  widths: string[];
  isFeatured: boolean;
  isArchived: boolean;
  updatedAt: Date;
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
    cell: ({ row }) => {
      const colors = row.original.colors.map((color) => (
        <ToolTip key={color} content={color}>
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
        </ToolTip>
      ));
      return <div className="flex flex-wrap gap-1">{colors}</div>;
    },
  },
  {
    accessorKey: 'length',
    header: 'Length',
    cell: ({ row }) => <ToolTip content={row.original.lengths.join(', ')}>{row.original.lengths.length}</ToolTip>,
  },
  {
    accessorKey: 'width',
    header: 'Width',
    cell: ({ row }) => <ToolTip content={row.original.widths.join(', ')}>{row.original.widths.length}</ToolTip>,
  },
  {
    accessorKey: 'gauge',
    header: 'Gauge',
    cell: ({ row }) => <ToolTip content={row.original.gauges.join(', ')}>{row.original.gauges.length}</ToolTip>,
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
    cell: ({ row }) => formatRelatedDate(row.original.updatedAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
