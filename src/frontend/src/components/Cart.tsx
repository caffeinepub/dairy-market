import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';
import { useGetCart, useGetCartTotal } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart = [], isLoading: isLoadingCart } = useGetCart();
  const { data: total = BigInt(0), isLoading: isLoadingTotal } = useGetCartTotal();

  const totalInDollars = Number(total) / 100;

  if (isLoadingCart || isLoadingTotal) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border p-8">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold text-foreground">Your cart is empty</h2>
        <p className="text-center text-muted-foreground">
          Add some fresh dairy products to get started!
        </p>
        <Button onClick={() => navigate({ to: '/' })} size="lg" className="mt-4">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={Number(item.product.id)} item={item} />
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-6">
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-foreground">Total:</span>
          <span className="text-2xl font-bold text-primary">${totalInDollars.toFixed(2)}</span>
        </div>
        <Button
          className="mt-4 w-full touch-manipulation"
          size="lg"
          onClick={() => navigate({ to: '/checkout' })}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
