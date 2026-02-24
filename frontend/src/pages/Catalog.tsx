import { useState, useMemo } from 'react';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import ProductDetailModal from '../components/ProductDetailModal';
import { useGetAllProducts } from '../hooks/useQueries';
import type { Product } from '../backend';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: allProducts = [] } = useGetAllProducts();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const isFiltered = !!searchQuery || selectedCategory !== 'All';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="relative">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="StyleMart Fashion Collection"
            className="h-48 w-full object-cover sm:h-64 md:h-80"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center bg-gradient-to-r from-secondary/80 to-transparent px-8 md:px-16">
            <h1 className="font-display text-3xl font-extrabold text-white drop-shadow-md sm:text-4xl md:text-5xl">
              Fashion for Everyone
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/90 drop-shadow sm:text-base">
              Discover the latest trends in Men, Women, Kids &amp; Accessories — all at unbeatable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-6 md:py-10">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for clothes, brands and more..."
          />
        </div>

        {/* Category Filter */}
        <div className="mb-5">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results info */}
        {isFiltered && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>{' '}
            result{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && (
              <>
                {' '}in{' '}
                <span className="font-semibold text-foreground">{selectedCategory}</span>
              </>
            )}
            {searchQuery && (
              <>
                {' '}for &quot;<span className="font-semibold text-foreground">{searchQuery}</span>&quot;
              </>
            )}
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={isFiltered ? filteredProducts : undefined}
          onProductClick={handleProductClick}
        />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
