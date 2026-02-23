import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGetCart } from '../hooks/useQueries';

export default function Header() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-xl font-bold text-primary-foreground">🥛</span>
          </div>
          <span className="text-xl font-bold text-foreground">Fresh Dairy Market</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => navigate({ to: '/cart' })}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 pt-8">
              <Link
                to="/"
                className="text-lg font-medium text-foreground transition-colors hover:text-foreground/80"
              >
                Products
              </Link>
              <Button
                variant="outline"
                className="relative justify-start"
                onClick={() => navigate({ to: '/cart' })}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart
                {itemCount > 0 && (
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
