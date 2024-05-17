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
