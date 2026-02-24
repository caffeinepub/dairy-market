import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useGetAllProducts, useInitializeProducts, useGetProductCount } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '../backend';

interface ProductGridProps {
  products?: Product[];
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products: filteredProducts, onProductClick }: ProductGridProps) {
  const { data: allProducts = [], isLoading } = useGetAllProducts();
  const { data: productCount } = useGetProductCount();
  const initializeProducts = useInitializeProducts();
  const queryClient = useQueryClient();

  const products = filteredProducts ?? allProducts;

  useEffect(() => {
    if (!isLoading && allProducts.length === 0 && !initializeProducts.isPending) {
      initializeProducts.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
          queryClient.invalidateQueries({ queryKey: ['productCount'] });
        },
      });
    }
  }, [allProducts.length, isLoading, initializeProducts, queryClient]);

  if (isLoading || initializeProducts.isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-border bg-card p-3">
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0 && allProducts.length > 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-lg font-semibold text-foreground">No products found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  if (allProducts.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-lg text-muted-foreground">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={Number(product.id)} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
}
