import { ProductCard } from '@/components/ProductCard';
import { GetProductsByCategory } from '@/lib/PlexolytAPI/products';
import { filterProducts } from '@/utils/filterProducts';
import { searchParamsToArray } from '@/utils/searchParamToArray';

interface Props {
  id: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductList({ id, searchParams }: Props) {
  const subCategories = searchParamsToArray(searchParams.type);
  const colors = searchParamsToArray(searchParams.color);
  const lengths = searchParamsToArray(searchParams.length);
  const widths = searchParamsToArray(searchParams.width);
  const gauges = searchParamsToArray(searchParams.gauge);

  const products = await GetProductsByCategory({ categoryId: id });

  if (products.status === 500) {
    throw new Error('Internal Server Error');
  }

  const filters = { subCategories, colors, lengths, widths, gauges };
  const filteredProducts = filterProducts(products.data, filters);

  if (filteredProducts?.length === 0 || !filteredProducts || !products) {
    return (
      <div>
        <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-24 md:py-16 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Products (0)</h2>
          <div className="mx-auto flex h-96 w-full items-center justify-center">
            <p>No product found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 md:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Products <span className="text-muted-foreground">({filteredProducts.length})</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
