import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface SmoothCategoriesStripProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
  onSearch?: (query: string) => void;
}

export default function CategoriesStrip({
  categories,
  activeCategory,
  onCategoryClick,
  onSearch,
}: SmoothCategoriesStripProps) {
  const { t } = useTranslation();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastClickedCategory, setLastClickedCategory] = useState<string | null>(
    null
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchMode) return;

    if (lastClickedCategory === activeCategory) {
      setLastClickedCategory(null);
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLElement>(
      `[data-category="${activeCategory}"]`
    );

    if (activeButton) {
      const containerWidth = container.clientWidth;
      const maxScroll = container.scrollWidth - containerWidth;
      const buttonCenter =
        activeButton.offsetLeft + activeButton.offsetWidth / 2;
      const target = Math.max(
        0,
        Math.min(buttonCenter - containerWidth / 2, maxScroll)
      );

      if (Math.abs(container.scrollLeft - target) > 20) {
        container.scrollTo({
          left: target,
          behavior: "smooth",
        });
      }
    }
  }, [activeCategory, isSearchMode, lastClickedCategory]);

  const handleSearchToggle = () => {
    setIsSearchMode(!isSearchMode);
    if (isSearchMode) {
      setSearchQuery("");
      onSearch?.("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setLastClickedCategory(categoryId);
    onCategoryClick(categoryId);
  };

  return (
    <div className="flex-shrink-0 bg-white py-3 relative z-10">
      <div className="px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchToggle}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSearchMode ? "text-black" : "text-black hover:bg-gray-200"
            }`}
          >
            {isSearchMode ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            {isSearchMode ? (
              <form onSubmit={handleSearchSubmit} className="w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t("searchPlaceholder")}
                  className="w-full px-3 py-1.5 bg-gray-100 rounded-full focus:outline-none focus:bg-gray-200 text-black placeholder:text-gray-500 text-sm"
                  autoFocus
                />
              </form>
            ) : (
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
              >
                <div className="flex space-x-1 min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      data-category={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-full ${
                        activeCategory === category.id
                          ? "text-white bg-black/85 border border-white"
                          : "text-[#6B4423]"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
