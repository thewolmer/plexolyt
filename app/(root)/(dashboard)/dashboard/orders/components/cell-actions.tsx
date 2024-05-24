'use client';

import { get } from 'http';

import { Order, OrderItem, Product } from '@prisma/client';
import { formatDate } from 'date-fns/format';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'; // Add the missing import statement for useEffect
import { toast } from 'sonner';

import { deleteOrder, getOrderByID } from '@/actions/orders';
import { BinIcon, CopyIcon, MoreIcon, UpdateIcon } from '@/components/Icons';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import db from '@/lib/db';
import { Copy } from '@/utils/Copy';

import { OrderColumn } from './columns';

interface CellActionsProps {
  data: OrderColumn;
}

interface OrderData extends Order {
  orderItems: OrderItemWithProduct[];
}
interface OrderItemWithProduct extends OrderItem {
  product: Product;
}
export const CellActions = ({ data }: CellActionsProps) => {
  const [order, setOrder] = useState<OrderData | null | undefined>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrderByID({ orderID: data.id });
      setOrder(order.data);
    };
    fetchOrder();
  }, [data]);

  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>Order Details</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerClose className="absolute right-5 top-5">
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <ScrollArea className="h-[90vh]">
            <Table className="px-10">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Id</TableCell>
                  <TableCell onClick={() => Copy(order?.id as string)} className="text-right">
                    {order?.id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payment Id</TableCell>
                  <TableCell onClick={() => Copy(order?.stripeId as string)} className="text-right">
                    {order?.stripeId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell className="text-right">{order?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell onClick={() => Copy(order?.email as string)} className="text-right">
                    {order?.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell onClick={() => Copy(order?.phone as string)} className="text-right">
                    {order?.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Number of Products</TableCell>
                  <TableCell className="text-right">{order?.orderItems.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amount</TableCell>
                  <TableCell className="text-right">{order?.amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payment Status</TableCell>
                  <TableCell className="text-right">{order?.payment_status}</TableCell>
                </TableRow>
                {/* <TableCell className="text-right">{formatDate(order?.createdAt as Date, 'PPpp')}</TableCell> */}
                <TableRow>
                  <TableCell className="font-medium">Updated At</TableCell>
                  {/* <TableCell className="text-right">{formatDate(order?.updatedAt as Date, 'PPpp')}</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Products Count</TableCell>
                  <TableCell className="text-right">{order?.orderItems.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableCaption>End of list of products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Sl. No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.orderItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
