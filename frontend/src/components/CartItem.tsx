import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRemoveFromCart, useUpdateCartQuantity } from '../hooks/useQueries';
import type { CartItem as CartItemType } from '../backend';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const removeFromCart = useRemoveFromCart();
  const updateCartQuantity = useUpdateCartQuantity();

  const handleIncrease = async () => {
    try {
      await updateCartQuantity.mutateAsync({
        productId: item.product.id,
        selectedSize: item.selectedSize,
        newQuantity: item.quantity + BigInt(1),
      });
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleDecrease = async () => {
    if (Number(item.quantity) <= 1) {
      handleRemove();
      return;
    }
    try {
      await updateCartQuantity.mutateAsync({
        productId: item.product.id,
        selectedSize: item.selectedSize,
        newQuantity: item.quantity - BigInt(1),
      });
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart.mutateAsync({
        productId: item.product.id,
        selectedSize: item.selectedSize,
      });
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const price = item.product.price;
  const originalPrice = item.product.originalPrice;
  const totalPrice = price * Number(item.quantity);
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const isPending = removeFromCart.isPending || updateCartQuantity.isPending;

  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
      {/* Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/96x96/f5f5f5/999?text=?';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            {item.product.brand}
          </p>
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {item.product.name}
          </h3>
          {item.selectedSize && item.selectedSize !== 'One Size' && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Size: <span className="font-medium text-foreground">{item.selectedSize}</span>
            </p>
          )}
          {/* Price */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-green-600">{discountPercent}% off</span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 touch-target"
              onClick={handleDecrease}
              disabled={isPending}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">{Number(item.quantity)}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 touch-target"
              onClick={handleIncrease}
              disabled={isPending}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-primary">${totalPrice.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive touch-target"
              onClick={handleRemove}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
