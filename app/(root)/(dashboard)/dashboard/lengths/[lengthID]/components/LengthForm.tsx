'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Length } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createLength, deleteLength, updateLength } from '@/actions/lengths';
import { BinIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { lengthFormSchema as formSchema } from '@/prisma/form-schema.client';

interface LengthFormProps {
  initialValues: Length | null | undefined;
}

export function LengthForm({ initialValues }: LengthFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Length' : 'Create Length';
  const description = initialValues ? 'Edit your length' : 'Create a new length';
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
        const length = await updateLength(initialValues.id as string, values);
        if (length.status === 200) {
          toast.success(length.message);
        } else {
          toast.error(length.message);
        }
      } else {
        const length = await createLength(values);
        if (length.status === 200) {
          toast.success(length.message);
        } else {
          toast.error(length.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the length');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const length = await deleteLength(initialValues?.id as string);
      if (length.status === 200) {
        toast.success(length.message);
        router.push('/dashboard/lengths');
      } else {
        toast.error(length.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the length');
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
