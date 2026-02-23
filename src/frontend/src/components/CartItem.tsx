import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useAddToCart, useRemoveFromCart } from '../hooks/useQueries';
import type { CartItem as CartItemType } from '../backend';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const handleIncrease = async () => {
    try {
      await addToCart.mutateAsync({
        productId: item.product.id,
        quantity: BigInt(1),
      });
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleDecrease = async () => {
    if (Number(item.quantity) === 1) {
      handleRemove();
      return;
    }
    try {
      await removeFromCart.mutateAsync(item.product.id);
      await addToCart.mutateAsync({
        productId: item.product.id,
        quantity: item.quantity - BigInt(1),
      });
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart.mutateAsync(item.product.id);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const priceInDollars = Number(item.product.price) / 100;
  const totalPrice = priceInDollars * Number(item.quantity);

  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">${priceInDollars.toFixed(2)} each</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 touch-manipulation"
              onClick={handleDecrease}
              disabled={addToCart.isPending || removeFromCart.isPending}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{Number(item.quantity)}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 touch-manipulation"
              onClick={handleIncrease}
              disabled={addToCart.isPending || removeFromCart.isPending}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleRemove}
              disabled={removeFromCart.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
