import { z } from 'zod';

export const colorFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Invalid Hex Code. Please enter a valid hex code. check from https://tailwindcolor.com/',
  }),
});

export const billboardFormSchema = z.object({
  label: z.string().min(2, {
    message: 'Label must be at least 2 characters.',
  }),

  imageUrl: z.string().min(2, {
    message: 'Upload an image for the category.',
  }),
});

export const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),

  billboardId: z.string().min(2, {
    message: 'Billboard must be selected.',
  }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters.',
    })
    .max(60, {
      message: 'Description must be at most 60 characters.',
    }),
});

export const lengthFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
});
export const gaugeFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
});

export const widthFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
});

export const productFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(500, {
      message: 'Description must be at most 500 characters.',
    }),
  price: z.string().min(1, {
    message: 'Price must be at least 1 characters.',
  }),
  stock: z.string().min(1, {
    message: 'Price must be at least 1 characters.',
  }),
  categoryId: z.string().min(2, {
    message: 'Category must be selected.',
  }),
  colorId: z.string().min(2, {
    message: 'Color must be selected.',
  }),
  lengthId: z.string().min(2, {
    message: 'Length must be selected.',
  }),
  widthId: z.string().min(2, {
    message: 'Width must be selected.',
  }),
  gaugeId: z.string().min(2, {
    message: 'Gauge must be selected.',
  }),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  images: z.object({ url: z.string() }).array(),
});

export const CheckOutFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }).max(50, { message: 'Name is too long.' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(10, { message: 'Invalid Phone Number' }).max(13, { message: 'Invalid Phone Number' }),
  line1: z.string().min(2, { message: 'Line 1 is required' }).max(60, { message: 'Line 1 is too long.' }),
  line2: z.string().min(2, { message: 'Line 2 is required' }).max(60, { message: 'Line 2 is too long.' }),
  city: z.string().min(2, { message: 'City is required' }).max(60, { message: 'City is too long.' }),
  state: z.string().min(2, { message: 'State is required' }).max(60, { message: 'State is too long.' }),
  postal_code: z.string().min(6, { message: 'Invalid Pin Code' }).max(6, { message: 'Invalid Pin Code' }),
  country: z.string().min(2).max(60),
});

export const UpdateOrderStatusFormSchema = z.object({
  order_status: z.enum(['PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'CANCELLED', 'DELIVERED']),
});
