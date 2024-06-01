'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Get } from '@/lib/helper';

import {
  ColorsResponse,
  GaugesResponse,
  LengthsResponse,
  SubCategoriesResponse,
  WidthsResponse,
} from '@/types/entities';

const handleGetRequest = async (url: string, tags: string[]): Promise<any> => {
  try {
    const data = await Get(url, { tags });
    return await data.json();
  } catch (e: any) {
    return {
      statusCode: 500,
      message: e.message,
    };
  }
};

export const GetAllColors = async (): Promise<ColorsResponse> => handleGetRequest('/api/colors', ['entities']);

export const GetAllLengths = async (): Promise<LengthsResponse> => handleGetRequest('/api/lengths', ['entities']);

export const GetAllWidths = async (): Promise<WidthsResponse> => handleGetRequest('/api/widths', ['entities']);

export const GetAllGauges = async (): Promise<GaugesResponse> => handleGetRequest('/api/gauges', ['entities']);

export const GetAllSubCategories = async (): Promise<SubCategoriesResponse> =>
  handleGetRequest('/api/subcategories', ['subcategories']);
