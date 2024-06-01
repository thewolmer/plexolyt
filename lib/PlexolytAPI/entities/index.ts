'use server';

import { Get } from '@/lib/helper';

import {
  ColorsResponse,
  GaugesResponse,
  LengthsResponse,
  SubCategoriesResponse,
  WidthsResponse,
} from '@/types/entities';

export const GetAllColors = async (): Promise<ColorsResponse> => {
  const data = await Get(`/api/colors`, {
    tags: ['colors'],
  });
  return await data.json();
};

export const GetAllLengths = async (): Promise<LengthsResponse> => {
  const data = await Get(`/api/lengths`, {
    tags: ['lengths'],
  });
  return await data.json();
};

export const GetAllWidths = async (): Promise<WidthsResponse> => {
  const data = await Get(`/api/widths`, {
    tags: ['widths'],
  });
  return await data.json();
};

export const GetAllGauges = async (): Promise<GaugesResponse> => {
  const data = await Get(`/api/gauges`, {
    tags: ['gauges'],
  });
  return await data.json();
};

export const GetAllSubCategories = async (): Promise<SubCategoriesResponse> => {
  const data = await Get(`/api/subcategories`, {
    tags: ['subcategories'],
  });
  return await data.json();
};
