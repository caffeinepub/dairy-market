import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, Package, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <h1 className="mb-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Order Confirmed! 🎉
          </h1>
          <p className="mb-8 text-base text-muted-foreground md:text-lg">
            Thank you for shopping with StyleMart! Your order has been placed successfully.
          </p>

          {/* Steps */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-left">
              <div className="rounded-full bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We're preparing your items for shipment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-left">
              <div className="rounded-full bg-secondary/10 p-2">
                <Truck className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Expected delivery within 3–5 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-left">
            <h2 className="mb-2 text-base font-bold text-foreground">What's Next?</h2>
            <p className="text-sm text-muted-foreground">
              You'll receive a confirmation email shortly with your order details and tracking
              information. Our team is packing your StyleMart order with care!
            </p>
          </div>

          <Button
            onClick={() => navigate({ to: '/' })}
            size="lg"
            className="mt-8 touch-target"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
