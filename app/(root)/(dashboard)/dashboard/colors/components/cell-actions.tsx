'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { deleteColor } from '@/actions/colors';
import { BinIcon, CopyIcon, MoreIcon, UpdateIcon } from '@/components/Icons';
import { AlertModal } from '@/components/Modals/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy } from '@/utils/Copy';

import { ColorColumn } from './columns';

interface CellActionsProps {
  data: ColorColumn;
}
export const CellActions = ({ data }: CellActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function onDelete(id: string) {
    try {
      setIsLoading(true);
      const color = await deleteColor(id as string);
      if (color.status === 200) {
        toast.success(color.message);
        router.refresh();
      } else {
        toast.error(color.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => Copy(data.id)}>
            <CopyIcon className="mr-2 size-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`${pathname}/${data.id}`)}>
            <UpdateIcon className="mr-2 size-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className="bg-destructive">
            <BinIcon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
