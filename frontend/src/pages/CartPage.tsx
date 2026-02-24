import Cart from '../components/Cart';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="touch-target">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        <h1 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
          Shopping Cart
        </h1>
        <Cart />
      </div>
    </div>
  );
}
