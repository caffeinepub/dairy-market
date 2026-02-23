import Cart from '../components/Cart';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>
        <Cart />
      </div>
    </div>
  );
}
