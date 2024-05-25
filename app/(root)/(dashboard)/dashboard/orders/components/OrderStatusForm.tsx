/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateOrderStatus } from '@/actions/orders';
import { LoadingSpinner } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UpdateOrderStatusFormSchema as formSchema } from '@/prisma/form-schema.client';

import { OrderData } from './cell-actions';

export function OrderStatusForm({ order }: { order: OrderData }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order_status: order.order_status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const update = await updateOrderStatus({ orderID: order.id, order_status: values.order_status });
      if (update.status === 200) {
        toast.success('Order status updated successfully!');
        router.refresh();
      } else {
        toast.error('Something went wrong!');
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="order_status"
          render={({ field }) => (
            <FormItem className="w-[300px]">
              <FormLabel>Order Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={order.order_status}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Update order status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                  <SelectItem value="PREPARING">PREPARING</SelectItem>
                  <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                  <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
