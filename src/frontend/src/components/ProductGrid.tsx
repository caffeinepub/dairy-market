import ProductCard from './ProductCard';
import { useGetAllProducts } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductGrid() {
  const { data: products = [], isLoading } = useGetAllProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={Number(product.id)} product={product} />
      ))}
    </div>
  );
}
