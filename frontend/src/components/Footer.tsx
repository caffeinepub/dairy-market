export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'stylemart'
  );

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 font-display text-xl font-extrabold text-foreground">
              Style<span className="text-primary">Mart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop fashion destination for Men, Women, Kids, and Accessories. Quality
              clothing at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Men's Fashion</li>
              <li>Women's Fashion</li>
              <li>Kids' Collection</li>
              <li>Accessories</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Help
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>Size Guide</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {currentYear} StyleMart. All rights reserved.
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
