import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rounded ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Card
      className="group cursor-pointer overflow-hidden border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imgError ? 'https://placehold.co/400x400/f5f5f5/999?text=No+Image' : product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {discountPercent && (
          <span className="absolute left-2 top-2 rounded bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground leading-snug">
          {product.name}
        </h3>

        <StarRating rating={product.rating} />

        {/* Price Row */}
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* View Details hint */}
        <p className="mt-2 text-xs text-primary font-medium opacity-0 transition-opacity group-hover:opacity-100">
          View Details →
        </p>
      </div>
    </Card>
  );
}
