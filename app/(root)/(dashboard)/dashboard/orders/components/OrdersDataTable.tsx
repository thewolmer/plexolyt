'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { LoadingSpinner } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function OrdersDataTable<TData, TValue>({ columns, data, searchKey }: DataTableProps<TData, TValue>) {
  const params = useSearchParams();
  const pathname = usePathname();
  const pending = params.get('pending');
  const delivered = params.get('delivered');
  const cancelled = params.get('cancelled');
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCheckboxChange = (status: string) => {
    const params = new URLSearchParams(window.location.search);
    const existingStatus = params.get(status);
    if (existingStatus) {
      params.delete(status);
    } else {
      params.set(status, 'hidden');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between py-4">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="items-top flex justify-end space-x-2">
          <Checkbox
            checked={pending === 'hidden'}
            onCheckedChange={() => handleCheckboxChange('pending')}
            id="terms1"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hide Pending
            </label>
          </div>
        </div>
        <div className="items-top flex justify-end space-x-2">
          <Checkbox
            checked={delivered === 'hidden'}
            onCheckedChange={() => handleCheckboxChange('delivered')}
            id="terms2"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hide Delivered
            </label>
          </div>
        </div>
        <div className="items-top flex justify-end space-x-2">
          <Checkbox
            checked={cancelled === 'hidden'}
            onCheckedChange={() => handleCheckboxChange('cancelled')}
            id="terms3"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hide Cancelled
            </label>
          </div>
        </div>
      </div>
      {!data ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
