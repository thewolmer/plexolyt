import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';

interface Filters {
  subCategories: string[];
  colors: string[];
  lengths: string[];
  widths: string[];
  gauges: string[];
}

export const filterProducts = (products: ProductWithPayLoad[], filters: Filters) =>
  products.filter((product) => {
    const matchesSubCategory = filters.subCategories.length
      ? filters.subCategories.includes(product.subCategoryId)
      : true;
    const matchesColors = filters.colors.length
      ? product.productColors.some((color) => filters.colors.includes(color.colorId))
      : true;
    const matchesLengths = filters.lengths.length
      ? product.productLengths.some((length) => filters.lengths.includes(length.lengthId))
      : true;
    const matchesWidths = filters.widths.length
      ? product.productWidths.some((width) => filters.widths.includes(width.widthId))
      : true;
    const matchesGauges = filters.gauges.length
      ? product.productGauges.some((gauge) => filters.gauges.includes(gauge.gaugeId))
      : true;

    return matchesSubCategory && matchesColors && matchesLengths && matchesWidths && matchesGauges;
  });
