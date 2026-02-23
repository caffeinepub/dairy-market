import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Thank you for your order. We'll deliver your fresh dairy products soon!
        </p>

        <div className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="mb-2 text-xl font-semibold text-foreground">What's Next?</h2>
          <p className="text-muted-foreground">
            You'll receive a confirmation email shortly with your order details and estimated
            delivery time. Our team will prepare your fresh dairy products with care.
          </p>
        </div>

        <Button
          onClick={() => navigate({ to: '/' })}
          size="lg"
          className="mt-8 touch-manipulation"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
