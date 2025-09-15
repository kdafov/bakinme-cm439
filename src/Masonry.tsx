import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Data model types
type Badge = "vegan" | "spicy" | "gluten-free";
type Currency = "EUR";

interface ModifierOption {
  id: string;
  label: string;
  priceDelta?: number;
}
interface ModifierGroup {
  id: string;
  name: string;
  required?: boolean;
  options: ModifierOption[];
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  badges?: Badge[];
  available?: boolean;
  modifiers?: ModifierGroup[];
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}
interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  background?: string;
}

interface MenuData {
  currency: Currency;
  categories: Category[];
  promo?: Promo;
  theme: { primary: string; accent: string; dark: string };
}

// Sample menu data
const menu: MenuData = {
  currency: "EUR",
  theme: { primary: "#F7C884", accent: "#DC7129", dark: "#462305" },
  promo: {
    id: "spring",
    title: "Spring Specials",
    subtitle: "Limited time • Save 15%",
    image: "image-placeholder.png",
    link: "/specials",
    background: "#F7C884",
  },
  categories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "bruschetta",
          name: "Bruschetta",
          description: "Tomato, basil, olive oil",
          image: "image-placeholder.png",
          price: 6.5,
          badges: ["vegan"],
        },
        {
          id: "calamari",
          name: "Crispy Calamari",
          description: "Lemon aioli",
          image: "image-placeholder.png",
          price: 8.0,
        },
        {
          id: "antipasto",
          name: "Antipasto Platter",
          description: "Selection of Italian cured meats and cheeses",
          price: 12.0,
        },
        {
          id: "arancini",
          name: "Arancini",
          description: "Risotto balls with mozzarella",
          price: 7.5,
          badges: ["spicy"],
        },
      ],
    },
    {
      id: "mains",
      name: "Mains",
      items: [
        {
          id: "carbonara",
          name: "Carbonara",
          description: "Pancetta, pecorino, egg",
          image: "image-placeholder.png",
          price: 13.5,
        },
        {
          id: "vegan-bowl",
          name: "Green Bowl",
          description: "Quinoa, avocado, greens",
          image: "image-placeholder.png",
          badges: ["vegan"],
          price: 11.0,
        },
        {
          id: "margherita",
          name: "Pizza Margherita",
          description: "Fresh mozzarella, basil, tomato sauce",
          price: 10.5,
          badges: ["gluten-free"],
        },
        {
          id: "salmon",
          name: "Grilled Salmon",
          description: "With seasonal vegetables",
          price: 18.0,
        },
        {
          id: "risotto",
          name: "Mushroom Risotto",
          description: "Wild mushrooms, parmesan, truffle oil",
          price: 14.5,
          badges: ["vegan"],
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: "espresso",
          name: "Espresso",
          image: "image-placeholder.png",
          price: 2.2,
        },
        {
          id: "lemonade",
          name: "House Lemonade",
          image: "image-placeholder.png",
        },
        {
          id: "wine",
          name: "House Wine",
          description: "Red or white",
          price: 4.5,
        },
        {
          id: "cocktail",
          name: "Signature Cocktail",
          description: "Ask your server",
          price: 8.0,
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "tiramisu",
          name: "Tiramisu",
          description: "Traditional Italian dessert",
          price: 6.0,
        },
        {
          id: "gelato",
          name: "Artisan Gelato",
          description: "3 scoops, seasonal flavors",
          price: 5.5,
          badges: ["gluten-free"],
        },
      ],
    },
  ],
};

const MenuCard = ({ item, isWide }: { item: MenuItem; isWide: boolean }) => {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isWide ? "col-span-2" : "col-span-1"
      }`}
    >
      {item.image && (
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {item.badges && item.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex gap-1">
              {item.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-xs font-medium bg-white/90 rounded-full"
                >
                  {badge === "vegan" ? "🌱" : badge === "spicy" ? "🌶️" : "🌾"}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-1"
          style={{ color: menu.theme.dark }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          {item.price !== undefined && (
            <span
              className="font-bold text-lg"
              style={{ color: menu.theme.accent }}
            >
              €{item.price.toFixed(2)}
            </span>
          )}
          {item.badges && item.badges.length > 0 && !item.image && (
            <div className="flex gap-1 ml-auto">
              {item.badges.map((badge) => (
                <span key={badge} className="text-sm">
                  {badge === "vegan" ? "🌱" : badge === "spicy" ? "🌶️" : "🌾"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HybridMasonryMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBadges, setSelectedBadges] = useState<Badge[]>([]);
  const [isDietaryOpen, setIsDietaryOpen] = useState(false);

  const allBadges: Badge[] = ["vegan", "spicy", "gluten-free"];

  const handlePromoClick = () => {
    if (menu.promo?.link) {
      window.open(menu.promo.link, "_blank");
    }
  };

  const toggleBadge = (badge: Badge) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const getFilteredItems = () => {
    let items: MenuItem[] = [];

    if (selectedCategory === "all") {
      items = menu.categories.flatMap((cat) => cat.items);
    } else {
      const category = menu.categories.find(
        (cat) => cat.id === selectedCategory
      );
      items = category?.items || [];
    }

    if (selectedBadges.length > 0) {
      items = items.filter(
        (item) =>
          item.badges &&
          item.badges.some((badge) => selectedBadges.includes(badge))
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  // Create masonry layout pattern: alternating between 2-wide and 3-narrow rows
  const createMasonryGrid = (items: MenuItem[]) => {
    const grid: { item: MenuItem; isWide: boolean }[] = [];
    let index = 0;

    while (index < items.length) {
      const isWideRow = Math.floor(index / 5) % 2 === 0; // Every other set of 5 items

      if (isWideRow) {
        // 2 wide cards
        for (let i = 0; i < 2 && index < items.length; i++) {
          grid.push({ item: items[index], isWide: true });
          index++;
        }
      } else {
        // 3 narrow cards
        for (let i = 0; i < 3 && index < items.length; i++) {
          grid.push({ item: items[index], isWide: false });
          index++;
        }
      }
    }

    return grid;
  };

  const masonryGrid = createMasonryGrid(filteredItems);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Promotional Banner */}
      {menu.promo && (
        <div
          className="w-full h-32 md:h-48 relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: menu.promo.background }}
          onClick={handlePromoClick}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2
                className="text-2xl md:text-4xl font-bold mb-2"
                style={{ color: menu.theme.dark }}
              >
                {menu.promo.title}
              </h2>
              {menu.promo.subtitle && (
                <p
                  className="text-sm md:text-lg opacity-80"
                  style={{ color: menu.theme.dark }}
                >
                  {menu.promo.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "all"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === "all"
                      ? menu.theme.primary
                      : "transparent",
                  border: `1px solid ${
                    selectedCategory === "all" ? menu.theme.primary : "#e5e7eb"
                  }`,
                }}
              >
                All Items
              </button>
              {menu.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category.id
                        ? menu.theme.primary
                        : "transparent",
                    border: `1px solid ${
                      selectedCategory === category.id
                        ? menu.theme.primary
                        : "#e5e7eb"
                    }`,
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Dietary Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDietaryOpen(!isDietaryOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium">Dietary</span>
                {selectedBadges.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedBadges.length}
                  </span>
                )}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDietaryOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <div className="p-2">
                    {allBadges.map((badge) => (
                      <button
                        key={badge}
                        onClick={() => toggleBadge(badge)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          selectedBadges.includes(badge)
                            ? "text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        style={{
                          backgroundColor: selectedBadges.includes(badge)
                            ? menu.theme.accent
                            : "transparent",
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {badge === "vegan"
                            ? "🌱"
                            : badge === "spicy"
                            ? "🌶️"
                            : "🌾"}
                          {badge.charAt(0).toUpperCase() + badge.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {masonryGrid.map(({ item, isWide }, index) => (
              <MenuCard
                key={`${item.id}-${index}`}
                item={item}
                isWide={isWide}
              />
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDietaryOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDietaryOpen(false)}
        />
      )}
    </div>
  );
}
