'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Width } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { BinIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { widthFormSchema as formSchema } from '@/prisma/form-schema';

import { createWidth, deleteWidth, updateWidth } from '@/actions/widths';

interface WidthFormProps {
  initialValues: Width | null | undefined;
}

export function WidthForm({ initialValues }: WidthFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Width' : 'Create Width';
  const description = initialValues ? 'Edit your width' : 'Create a new width';
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
        const width = await updateWidth(initialValues.id as string, values);
        if (width.status === 200) {
          toast.success(width.message);
        } else {
          toast.error(width.message);
        }
      } else {
        const width = await createWidth(values);
        if (width.status === 200) {
          toast.success(width.message);
        } else {
          toast.error(width.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the width');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const width = await deleteWidth(initialValues?.id as string);
      if (width.status === 200) {
        toast.success(width.message);
        router.push('/dashboard/widths');
      } else {
        toast.error(width.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the width');
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
