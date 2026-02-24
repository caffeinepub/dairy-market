import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, X } from 'lucide-react';
import { useAddToCart } from '../hooks/useQueries';
import type { Product } from '../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addToCart = useAddToCart();

  const handleClose = () => {
    setSelectedSize('');
    onClose();
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const sizeToUse = product.sizes.length === 0 ? 'One Size' : selectedSize;
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(1),
        selectedSize: sizeToUse,
      });
      toast.success(`${product.name} added to cart!`);
      handleClose();
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  if (!product) return null;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const hasSizes = product.sizes.length > 0;
  const canAddToCart = !hasSizes || !!selectedSize;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-64 w-full object-cover md:h-full md:min-h-[400px]"
              onError={(e) => {
                e.currentTarget.src =
                  'https://placehold.co/400x400/f5f5f5/999?text=No+Image';
              }}
            />
            {discountPercent && (
              <span className="absolute left-3 top-3 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4 p-6">
            <DialogHeader className="space-y-1 text-left">
              <div className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {product.brand}
              </div>
              <DialogTitle className="text-xl font-bold leading-tight text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            {/* Rating */}
            <StarRating rating={product.rating} />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>

            {/* Category Badge */}
            <Badge variant="secondary" className="w-fit">
              {product.category}
            </Badge>

            {/* Size Selection */}
            {hasSizes && (
              <div>
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Select Size{' '}
                  {!selectedSize && (
                    <span className="font-normal text-muted-foreground">(required)</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      disabled={!size.available}
                      onClick={() => size.available && setSelectedSize(size.name)}
                      className={[
                        'size-btn',
                        !size.available
                          ? 'size-btn-unavailable'
                          : selectedSize === size.name
                          ? 'size-btn-selected'
                          : 'size-btn-available',
                      ].join(' ')}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              className="mt-auto w-full touch-target"
              size="lg"
              onClick={handleAddToCart}
              disabled={!canAddToCart || addToCart.isPending}
            >
              {addToCart.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {hasSizes && !selectedSize ? 'Select a Size' : 'Add to Cart'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
