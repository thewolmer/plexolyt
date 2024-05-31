import { ProductCardLoader } from '@/components/Loaders/ProductCardLoader';

export const ProductListLoader = () => (
  <section>
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 md:py-16 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">
        Products <span className="text-muted-foreground"></span>
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardLoader key={index} />
        ))}
      </div>
    </div>
  </section>
);
