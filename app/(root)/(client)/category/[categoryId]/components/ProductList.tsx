import { QueryProducts } from '@/actions/products.client';
import { ProductCard } from '@/components/ProductCard';

export default async function ProductList({ id }: { id: string }) {
  const products = await QueryProducts({ category: id });

  if (products.data?.length === 0)
    return (
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight ">Products </h2>
          <div className="flex h-96 items-center justify-center">
            <p>No products found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">Products </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.data?.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </div>
    </div>
  );
}
