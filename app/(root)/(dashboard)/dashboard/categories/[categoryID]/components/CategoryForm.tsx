'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createCategory, deleteCategory, updateCategory } from '@/actions/categories';
import { BinIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categoryFormSchema as formSchema } from '@/prisma/form-schema.client';

interface CategoryFormProps {
  initialValues: Category | null | undefined;
  billboards: Billboard[] | null | undefined;
}

export function CategoryForm({ initialValues, billboards }: CategoryFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Category' : 'Create Category';
  const description = initialValues ? 'Edit your category' : 'Create a new category';
  const action = initialValues ? 'Save Changes' : 'Create';
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      billboardId: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialValues) {
        const category = await updateCategory(initialValues.id as string, values);
        if (category.status === 200) {
          toast.success(category.message);
        } else {
          toast.error(category.message);
        }
      } else {
        const category = await createCategory(values);
        if (category.status === 200) {
          toast.success(category.message);
        } else {
          toast.error(category.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the category');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const category = await deleteCategory(initialValues?.id as string);
      if (category.status === 200) {
        toast.success(category.message);
        router.push('/dashboard/categories');
      } else {
        toast.error(category.message);
      }
    } catch (e) {
      console.log(e);
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
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              disabled={initialValues ? true : false}
              name="name"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Label" {...field} />
                  </FormControl>
                  <FormDescription>This will be your category name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Billboard</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>This will be your category name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add a description about the category" className="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be added to product description and will be shown in Google search results.
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
