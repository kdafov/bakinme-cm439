import { useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    onCategoryClick(categoryId);

    setTimeout(() => {
      const activeButton = document.querySelector(
        `[data-category="${categoryId}"]`
      );
      if (activeButton && scrollContainerRef.current) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, 100);
  };

  return (
    <div className="flex-shrink-0 bg-gradient-to-r from-[#F7C884]/15 to-[#DC7129]/15 py-3">
      <div className="px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchToggle}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSearchMode
                ? "text-[#462305]"
                : "text-[#462305] hover:bg-[#DC7129]/10"
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
                  className="w-full px-3 py-1.5 bg-white/50 rounded-full focus:outline-none focus:bg-white/80 text-[#462305] placeholder:text-[#462305]/60 text-sm"
                  autoFocus
                />
              </form>
            ) : (
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="flex space-x-1 min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      data-category={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-full ${
                        activeCategory === category.id
                          ? "text-[#462305] bg-[#DC7129]/20"
                          : "text-[#DC7129] hover:bg-[#DC7129]/10"
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
