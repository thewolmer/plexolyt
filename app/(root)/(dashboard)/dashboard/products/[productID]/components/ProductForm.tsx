'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Color, Gauge, Length, SubCategory, Width } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createProduct, deleteProduct, updateProduct } from '@/actions/products';
import { BinIcon, LoadingSpinner } from '@/components/Icons';
import { ProductsImageUpload } from '@/components/ImageUpload/ProductsImageUpload';
import { Header } from '@/components/Layout';
import { AlertModal } from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multi-selector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { productFormSchema as formSchema } from '@/prisma/form-schema.client';

import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';

export interface ProductFormProps {
  initialValues: ProductWithPayLoad | null | undefined;
  categories: Category[] | null | undefined;
  subcategories: SubCategory[] | null | undefined;
  colors: Color[] | null | undefined;
  lengths: Length[] | null | undefined;
  widths: Width[] | null | undefined;
  gauges: Gauge[] | null | undefined;
}

export function ProductForm({
  initialValues,
  categories,
  subcategories,
  colors,
  lengths,
  widths,
  gauges,
}: ProductFormProps) {
  const router = useRouter();
  const title = initialValues ? 'Edit Product' : 'Create Product';
  const description = initialValues ? 'Edit your product' : 'Create a new product';
  const action = initialValues ? 'Save Changes' : 'Create';
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          images: initialValues.images.map((image) => ({ url: image?.imageUrl })),
          colorIds: initialValues.productColors.map((color) => ({ label: color.color.name, value: color.colorId })),
          lengthIds: initialValues.productLengths.map((length) => ({
            label: length.length.name,
            value: length.lengthId,
          })),
          widthIds: initialValues.productWidths.map((width) => ({ label: width.width.name, value: width.widthId })),
          gaugeIds: initialValues.productGauges.map((gauge) => ({ label: gauge.gauge.name, value: gauge.gaugeId })),
        }
      : {
          name: '',
          images: [],
          price: '0',
          stock: '0',
          categoryId: '',
          subCategoryId: '',
          colorIds: [],
          lengthIds: [],
          gaugeIds: [],
          widthIds: [],
          isArchived: false,
          isFeatured: false,
          description: '',
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialValues) {
        const product = await updateProduct(initialValues.id as string, values);
        if (product.status === 200) {
          toast.success(product.message);
        } else {
          toast.error(product.message);
        }
      } else {
        if (isNaN(Number(values.price)) || isNaN(Number(values.stock))) {
          toast.error('Price and Stock must be a number');
          return;
        }
        const product = await createProduct(values);
        if (product.status === 200) {
          toast.success(product.message);
        } else {
          toast.error(product.message);
        }
      }
    } catch (e) {
      toast.error('Something went wrong while creating the product');
    } finally {
      setIsLoading(false);
      setIsCreated(true);
      router.refresh();
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      const product = await deleteProduct(initialValues?.id as string);
      if (product.status === 200) {
        toast.success(product.message);
        router.push('/dashboard/products');
      } else {
        toast.error(product.message);
      }
    } catch (e) {
      toast.error('Something went wrong while deleting the product');
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
            name="images"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ProductsImageUpload
                    onChange={(images) => field.onChange(images)}
                    disabled={isLoading}
                    initialValues={initialValues}
                  />
                </FormControl>
                <FormDescription>Max Image Size 4MB, Max count 5</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>This will be shown below the product image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" autoComplete="off" placeholder="100" {...field} />
                  </FormControl>
                  <FormDescription>This will be product&apos;s price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" autoComplete="off" placeholder="100" {...field} />
                  </FormControl>
                  <FormDescription>This will be product&apos;s stock.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The products will be shown under this category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem className="md:max-w-md">
                  <FormLabel>Sub Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Sub Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The products will be shown under this category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={colors?.map((color) => ({ value: color.id, label: color.name })) as Option[]}
                      placeholder="Select Colors"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-muted-foreground">no results found.</p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lengthIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lengths</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={lengths?.map((length) => ({ value: length.id, label: length.name })) as Option[]}
                      placeholder="Select Lengths"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-muted-foreground">no results found.</p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widthIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Widths</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={widths?.map((width) => ({ value: width.id, label: width.name })) as Option[]}
                      placeholder="Select Widths"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-muted-foreground">no results found.</p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gaugeIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gauges</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={gauges?.map((gauge) => ({ value: gauge.id, label: gauge.name })) as Option[]}
                      placeholder="Select Gauges"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-muted-foreground">no results found.</p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add this product to featured list.</FormLabel>
                    <FormDescription>This will add the product to home page.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add this product to Archived.</FormLabel>
                    <FormDescription>This will hide this product from the store.</FormDescription>
                  </div>
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
                    <Textarea placeholder="Add a description about the product" className="" {...field} />
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
            {isLoading ? <LoadingSpinner /> : <>{action} </>}
          </Button>
        </form>
      </Form>
    </>
  );
}
