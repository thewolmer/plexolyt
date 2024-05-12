'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';

const formSchema = z.object({
  name: z.string().min(2).max(25),
  access_secret: z.string().refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
    message: 'Invalid secret, must be exactly 12 bytes',
  }),
});

export const StoreModal = () => {
  const [Loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      access_secret: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loadingToast = toast.loading('Creating your store dashboard...');
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      console.log(response.data);
      toast.success(`Store validated ${response.data.slug}`, {
        id: loadingToast,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create your store dashboard', {
        id: loadingToast,
        description: `${error!.response!.status} : ${error?.response?.data}`,
      });
    } finally {
      setLoading(false);
    }
  }
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create your store dashboard"
      description="Use the form to create your store dashboard. Contact developer team for your store's Access Secret"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of your store</FormLabel>
                <FormControl>
                  <Input placeholder="My Store" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="access_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Secret</FormLabel>
                <FormControl>
                  <Input placeholder="ashg7s87a9-8689s76a-sagjgs78" {...field} />
                </FormControl>
                <FormDescription>Access Secret will be provided by the developer.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={Loading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
