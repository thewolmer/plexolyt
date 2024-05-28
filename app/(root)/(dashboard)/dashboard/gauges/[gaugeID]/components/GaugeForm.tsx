'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Gauge } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createGauge, deleteGauge, updateGauge } from '@/actions/gauges';
import { BinIcon } from '@/components/Icons';
import { Header } from '@/components/Layout';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { gaugeFormSchema as formSchema } from '@/prisma/form-schema.client';

interface GaugeFormProps {
  initialValues: Gauge | null | undefined;
}

export function GaugeForm({ initialValues }: GaugeFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Gauge' : 'Create Gauge';
  const description = initialValues ? 'Edit your gauge' : 'Create a new gauge';
  const action = initialValues ? 'Save Changes' : 'Create';
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialValues) {
        const gauge = await updateGauge(initialValues.id as string, values);
        if (gauge.status === 200) {
          toast.success(gauge.message);
        } else {
          toast.error(gauge.message);
        }
      } else {
        const gauge = await createGauge(values);
        if (gauge.status === 200) {
          toast.success(gauge.message);
        } else {
          toast.error(gauge.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the gauge');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const gauge = await deleteGauge(initialValues?.id as string);
      if (gauge.status === 200) {
        toast.success(gauge.message);
        router.push('/dashboard/gauges');
      } else {
        toast.error(gauge.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the gauge');
    } finally {
      setIsLoading(false);
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <>
      <AlertModal isOpen={isOpen} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isLoading} />
      <Header title={title} description={description}>
        {initialValues && (
          <Button variant="destructive" disabled={isLoading} onClick={() => setOpen(true)}>
            <BinIcon />
          </Button>
        )}
      </Header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" mx-auto max-w-6xl space-y-8 p-10 md:py-10 ">
          <div className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>This will be shown to the users.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading || isCreated} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
