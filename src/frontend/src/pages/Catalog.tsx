import ProductGrid from '../components/ProductGrid';

export default function Catalog() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Farm Fresh Dairy Products
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Delivered straight from local farms to your doorstep. Pure, natural, and delicious.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/assets/generated/hero-banner.dim_1200x400.png"
              alt="Fresh dairy products"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container py-12 md:py-16">
        <h2 className="mb-8 text-3xl font-bold text-foreground">Our Products</h2>
        <ProductGrid />
      </section>
    </div>
  );
}
