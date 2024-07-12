'use client';

import { Order, OrderItem, Product } from '@prisma/client';
import { format } from 'date-fns/format';
import React, { useEffect, useState } from 'react';

import { getOrderByID } from '@/actions/orders';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from '@/utils/Copy';
import { truncateId } from '@/utils/truncateId';

import { OrderColumn } from './columns';
import { OrderStatusForm } from './OrderStatusForm';

interface CellActionsProps {
  data: OrderColumn;
}

export interface OrderData extends Order {
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
        <div className="mx-auto  max-w-3xl ">
          <DrawerHeader>
            <DrawerTitle>Order Details</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerClose className="absolute right-5 top-5">
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <ScrollArea className="h-[90vh]">
            <div className="flex flex-col gap-10">
              <Table className="px-10">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Id</TableCell>
                    <TableCell onClick={() => Copy(order?.id as string)} className="text-right">
                      {order?.id}
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
                  <TableRow>
                    <TableCell className="font-medium">RazporPay Payment Id</TableCell>
                    <TableCell
                      onClick={() => Copy(order?.payment_id as string)}
                      className=" max-w-[200px] truncate text-right"
                    >
                      {truncateId(order?.payment_id)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RazporPay Order Id</TableCell>
                    <TableCell
                      onClick={() => Copy(order?.razorpay_order_id as string)}
                      className=" max-w-[200px] truncate text-right"
                    >
                      {truncateId(order?.razorpay_order_id)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment Method</TableCell>
                    <TableCell className="text-right">{order?.payment_method}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bank</TableCell>
                    <TableCell className="text-right">{order?.bank}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">VPA</TableCell>
                    <TableCell className="text-right">{order?.vpa}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UPI/ Bank Transaction Id</TableCell>
                    <TableCell
                      onClick={() => Copy(order?.transaction_id as string)}
                      className=" max-w-[200px] truncate text-right"
                    >
                      {truncateId(order?.transaction_id)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Order Created At</TableCell>
                    <TableCell className="text-right">
                      {order?.createdAt ? format(new Date(order.createdAt), 'PPpp') : 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment Confirmation At</TableCell>
                    <TableCell className="text-right">
                      {order?.updatedAt ? format(new Date(order.updatedAt), 'PPpp') : 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
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
              <Table>
                <TableCaption>End of Order Details.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Address Line 1</TableCell>
                    <TableCell onClick={() => Copy(order?.line1 as string)} className="text-right">
                      {order?.line1}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Address Line 2</TableCell>
                    <TableCell onClick={() => Copy(order?.line2 as string)} className="text-right">
                      {order?.line2}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">City</TableCell>
                    <TableCell onClick={() => Copy(order?.city as string)} className="text-right">
                      {order?.city}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">State</TableCell>
                    <TableCell onClick={() => Copy(order?.state as string)} className="text-right">
                      {order?.state}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Country</TableCell>
                    <TableCell onClick={() => Copy(order?.country as string)} className="text-right">
                      {order?.country}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Postal code</TableCell>
                    <TableCell onClick={() => Copy(order?.postal_code as string)} className="text-right">
                      {order?.postal_code}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="p-5">
              <OrderStatusForm order={order as OrderData} />
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
