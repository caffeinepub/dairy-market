import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useGetCart } from '../hooks/useQueries';

export default function Header() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary shadow-md">
      <div className="container flex h-16 items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/assets/generated/stylemart-logo.dim_300x80.png"
            alt="StyleMart Logo"
            className="h-9 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-display text-xl font-extrabold text-white">
            Style<span className="text-primary">Mart</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Shop
            </Link>
          </nav>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10 touch-target"
            onClick={() => navigate({ to: '/cart' })}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 md:hidden touch-target"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-6">
                <div className="mb-2 font-display text-lg font-bold text-foreground">
                  Style<span className="text-primary">Mart</span>
                </div>
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent"
                  >
                    Shop All
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent"
                    onClick={() => navigate({ to: '/cart' })}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                    {itemCount > 0 && (
                      <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
