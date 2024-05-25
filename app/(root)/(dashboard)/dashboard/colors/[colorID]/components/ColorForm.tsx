'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createColor, deleteColor, updateColor } from '@/actions/colors';
import { BinIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { colorFormSchema as formSchema } from '@/prisma/form-schema.client';

interface ColorFormProps {
  initialValues: Color | null | undefined;
}

export function ColorForm({ initialValues }: ColorFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Color' : 'Create Color';
  const description = initialValues ? 'Edit your color' : 'Create a new color';
  const action = initialValues ? 'Save Changes' : 'Create';
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [hexValue, setHexValue] = useState(initialValues?.hex || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      hex: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialValues) {
        const color = await updateColor(initialValues.id as string, values);
        if (color.status === 200) {
          toast.success(color.message);
        } else {
          toast.error(color.message);
        }
      } else {
        const color = await createColor(values);
        if (color.status === 200) {
          toast.success(color.message);
        } else {
          toast.error(color.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the color');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const color = await deleteColor(initialValues?.id as string);
      if (color.status === 200) {
        toast.success(color.message);
        router.push('/dashboard/colors');
      } else {
        toast.error(color.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the color');
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
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Color name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Color" {...field} />
                  </FormControl>
                  <FormDescription>This will be the color color name shown to the user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Color Hex</FormLabel>
                  <FormControl>
                    <Input
                      style={{ borderColor: hexValue || '', borderWidth: '2px' }}
                      autoComplete="off"
                      placeholder="#000000"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setHexValue(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The Color must be in Hex. Click and copy paste from{' '}
                    <Link className="underline underline-offset-2" href="https://tailwindcolor.com/">
                      here.
                    </Link>
                  </FormDescription>
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
