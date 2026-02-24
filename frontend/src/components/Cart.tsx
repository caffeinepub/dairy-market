import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';
import { useGetCart, useGetCartTotal } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart = [], isLoading: isLoadingCart } = useGetCart();
  const { data: total = 0, isLoading: isLoadingTotal } = useGetCartTotal();

  if (isLoadingCart || isLoadingTotal) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border p-8 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">Your StyleMart cart is empty</h2>
        <p className="text-muted-foreground">
          Add items to it now — browse our latest fashion collection!
        </p>
        <Button
          onClick={() => navigate({ to: '/' })}
          size="lg"
          className="mt-2 touch-target"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Cart Items */}
      <div className="space-y-4 lg:col-span-2">
        <p className="text-sm text-muted-foreground">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
        </p>
        {cart.map((item) => (
          <CartItem
            key={`${Number(item.product.id)}-${item.selectedSize}`}
            item={item}
          />
        ))}
      </div>

      {/* Order Summary */}
      <div className="h-fit rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="mb-4 text-lg font-bold text-foreground">Price Details</h2>
        <Separator className="mb-4" />
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Price ({itemCount} item{itemCount !== 1 ? 's' : ''})
            </span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Charges</span>
            <span className="font-medium text-green-600">FREE</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between text-base font-bold">
          <span>Total Amount</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-xs text-green-600">
          You save on delivery charges!
        </p>
        <Button
          className="mt-5 w-full touch-target"
          size="lg"
          onClick={() => navigate({ to: '/checkout' })}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
