import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GetAllCategories } from '@/lib/PlexolytAPI/categories';

const BrowseCategories = async () => {
  const categories = await GetAllCategories();
  if (categories.status !== 200 || !categories.data) {
    <section className="body-font">
      <div className="container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">Explore Categories</h2>
        <div className="-m-4 mt-6 flex items-center justify-center">
          <p className="text-destructive">An error occurred while loading categories</p>
        </div>
      </div>
    </section>;
  }

  return (
    <section className="body-font">
      <div className="container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">Explore Categories</h2>
        <div className="-m-4 mt-6 grid grid-cols-1 md:grid-cols-3">
          {categories.data?.map((item) => (
            <div key={item.id} className="p-4 ">
              <Card className="overflow-hidden rounded-lg border-2 border-opacity-60 shadow-xl">
                <div className="aspect-h-9 aspect-w-16">
                  <Image
                    height={144}
                    width={720}
                    className="w-full object-cover object-center md:h-36 lg:h-48"
                    src={item.billboard.imageUrl}
                    alt="blog"
                  />
                </div>
                <CardContent className="px-6 py-4">
                  <h3 className="title-font  text-lg font-medium ">{item.name}</h3>
                  <p className="mb-3 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap items-center justify-end">
                    <Link
                      href={`/category/${item.id}`}
                      className={buttonVariants({
                        variant: 'default',
                      })}
                    >
                      Explore
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
