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
  billboardID: z.string().min(2, {
    message: 'Billboard must be selected.',
  }),
});

export const lengthFormSchema = z.object({
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
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  images: z.object({ url: z.string() }).array(),
});
