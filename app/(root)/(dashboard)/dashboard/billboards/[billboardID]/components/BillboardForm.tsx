'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createBillboard, deleteBillboard, updateBillboard } from '@/actions/billboards';
import { BinIcon } from '@/components/Icons';
import { BillboardImageUpload } from '@/components/ImageUpload/BillboardImageUpload';
import { Header } from '@/components/Layout/Header';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { billboardFormSchema as formSchema } from '@/prisma/form-schema.client';

interface BillboardFormProps {
  initialValues: Billboard | null | undefined;
}

export function BillboardForm({ initialValues }: BillboardFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Billboard' : 'Create Billboard';
  const description = initialValues ? 'Edit your billboard' : 'Create a new billboard';
  const action = initialValues ? 'Save Changes' : 'Create';
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      label: '',
      imageUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialValues) {
        const billboard = await updateBillboard(initialValues.id as string, values);
        if (billboard.status === 200) {
          toast.success(billboard.message);
        } else {
          toast.error(billboard.message);
        }
      } else {
        const billboard = await createBillboard(values);
        if (billboard.status === 200) {
          toast.success(billboard.message);
        } else {
          toast.error(billboard.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the billboard');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const billboard = await deleteBillboard(initialValues?.id as string);
      if (billboard.status === 200) {
        toast.success(billboard.message);
        router.push('/dashboard/billboards');
      } else {
        toast.error(billboard.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the billboard');
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image </FormLabel>
                <FormControl>
                  <BillboardImageUpload
                    onChange={(image) => field.onChange(image)}
                    disabled={isLoading}
                    initialValues={initialValues}
                  />
                </FormControl>
                <FormDescription>Max Image Size 4MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Label" {...field} />
                  </FormControl>
                  <FormDescription>This will be shown below the billboard image.</FormDescription>
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
