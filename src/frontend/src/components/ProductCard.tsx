import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useAddToCart } from '../hooks/useQueries';
import type { Product } from '../backend';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useAddToCart();

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(1),
      });
      setIsAdded(true);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const priceInDollars = Number(product.price) / 100;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="mt-3 text-2xl font-bold text-primary">${priceInDollars.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full touch-manipulation"
          onClick={handleAddToCart}
          disabled={addToCart.isPending || isAdded}
          size="lg"
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
