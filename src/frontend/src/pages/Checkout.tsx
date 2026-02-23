import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCart, useGetCartTotal, useCheckout } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const { data: total = BigInt(0) } = useGetCartTotal();
  const checkout = useCheckout();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const totalInDollars = Number(total) / 100;

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
      console.error('Checkout error:', error);
    }
  };

  if (cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={Number(item.product.id)} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} × {Number(item.quantity)}
                  </span>
                  <span className="font-medium">
                    ${((Number(item.product.price) / 100) * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalInDollars.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
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
                  className="w-full touch-manipulation"
                  size="lg"
                  disabled={checkout.isPending}
                >
                  {checkout.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
