interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max gap-2 pb-1 md:min-w-0 md:flex-wrap">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={[
                'touch-target flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-card text-foreground hover:border-primary hover:text-primary',
              ].join(' ')}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
