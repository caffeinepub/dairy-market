import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetCart, useGetCartTotal, useCheckout } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, ChevronLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Checkout() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const { data: total = 0 } = useGetCartTotal();
  const checkout = useCheckout();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await checkout.mutateAsync();
      toast.success('Order placed successfully!');
      navigate({ to: '/confirmation' });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <div className="mb-4">
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="touch-target">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
        </div>
        <h1 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
          Checkout
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Delivery Information */}
          <Card className="order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-lg">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="touch-target"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="touch-target"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="touch-target"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Apt 4B, City, State, ZIP"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full touch-target"
                  size="lg"
                  disabled={checkout.isPending}
                >
                  {checkout.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="order-1 h-fit lg:order-2">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map((item) => (
                <div
                  key={`${Number(item.product.id)}-${item.selectedSize}`}
                  className="flex items-start justify-between gap-2 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.product.brand}
                      {item.selectedSize && item.selectedSize !== 'One Size'
                        ? ` · Size: ${item.selectedSize}`
                        : ''}
                      {' · '}Qty: {Number(item.quantity)}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold">
                    ${(item.product.price * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                </span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
