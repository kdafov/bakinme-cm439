import { useState } from "react";
import { menu } from "./data";

const badgeConfig: Record<
  string,
  { label: string; color: string; group: "plant" | "spice" | "allergen" }
> = {
  vegan: { label: "V", color: "bg-green-700", group: "plant" },
  vegetarian: { label: "VG", color: "bg-green-700", group: "plant" },
  spicy: { label: "🌶", color: "bg-red-700", group: "spice" },
  "gluten-free": { label: "GF", color: "bg-blue-700", group: "allergen" },
  nuts: { label: "N", color: "bg-blue-700", group: "allergen" },
  dairy: { label: "D", color: "bg-blue-700", group: "allergen" },
  eggs: { label: "E", color: "bg-blue-700", group: "allergen" },
  fish: { label: "F", color: "bg-blue-700", group: "allergen" },
  shellfish: { label: "S", color: "bg-blue-700", group: "allergen" },
  soy: { label: "SY", color: "bg-blue-700", group: "allergen" },
};

export default function PhotoGridNamesOnly() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showLegend, setShowLegend] = useState(false);

  const getFilteredItems = () => {
    if (selectedCategory === "all")
      return menu.categories.flatMap((c) => c.items);
    const cat = menu.categories.find((c) => c.id === selectedCategory);
    return cat ? cat.items : [];
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Promo Banner */}
      {menu.promo && (
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: menu.promo.background || menu.theme.primary,
          }}
        >
          <div className="px-4 py-6 text-center">
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: menu.theme.dark }}
            >
              {menu.promo.title}
            </h2>
            {menu.promo.subtitle && (
              <p
                className="text-xs opacity-80"
                style={{ color: menu.theme.dark }}
              >
                {menu.promo.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Category Bar: 70% scrollable pills + sticky-right Allergens button */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="relative flex items-center px-3 py-2">
          {/* Scrollable 70% container */}
          <div className="w-[70%] overflow-x-auto pr-10 scrollbar-hide">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition ${
                  selectedCategory === "all"
                    ? "text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={
                  selectedCategory === "all"
                    ? { backgroundColor: menu.theme.accent }
                    : {}
                }
              >
                All Items
              </button>
              {menu.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition ${
                    selectedCategory === category.id
                      ? "text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={
                    selectedCategory === category.id
                      ? { backgroundColor: menu.theme.accent }
                      : {}
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky-right allergens button (stays visible; does not scroll horizontally) */}
          <div className="ml-auto sticky right-0 pl-2">
            <div className="relative">
              {/* fade mask so pills don't sit under the button */}
              <div className="pointer-events-none absolute -left-6 top-0 h-full w-6 bg-gradient-to-r from-white/0 to-white" />
              <button
                onClick={() => setShowLegend(true)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50 shadow-sm flex items-center gap-1.5"
                title="Allergen & dietary legend"
                aria-haspopup="dialog"
                aria-expanded={showLegend}
              >
                Allergens
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition hover:shadow-md"
            >
              <div className="relative aspect-square bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&crop=center";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-gray-400 text-3xl">🍽️</div>
                  </div>
                )}

                {item.badges?.length ? (
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {item.badges.map((badge, i) => {
                      const cfg =
                        badgeConfig[badge] ||
                        ({
                          label: badge.toUpperCase(),
                          color: "bg-gray-700",
                          group: "allergen",
                        } as const);
                      return (
                        <span
                          key={`${badge}-${i}`}
                          className={`${cfg.color} text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow`}
                        >
                          {cfg.label}
                        </span>
                      );
                    })}
                  </div>
                ) : null}

                {item.available === false && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Unavailable</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3
                  className="font-medium text-center text-sm leading-tight"
                  style={{ color: menu.theme.dark }}
                >
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <p className="text-gray-500">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Right-side mobile-friendly drawer (no document.* listeners) */}
      {showLegend && (
        <>
          <button
            aria-label="Close legend backdrop"
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowLegend(false)}
          />
          <aside
            className="fixed right-0 top-0 h-full z-50 w-[88vw] max-w-sm bg-white shadow-2xl border-l border-gray-200 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Allergen and dietary legend"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h4
                className="text-base font-semibold"
                style={{ color: menu.theme.dark }}
              >
                Dietary & Allergen Guide
              </h4>
              <button
                onClick={() => setShowLegend(false)}
                className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                aria-label="Close legend"
                title="Close"
              >
                ×
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {/* Plant-Based (Green) */}
              <section className="mb-5">
                <h5 className="text-sm font-semibold mb-2 text-gray-700">
                  Plant-Based
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {["vegan", "vegetarian"].map((key) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <span
                        className={`${badgeConfig[key].color} text-white px-2 py-1 rounded-full font-medium`}
                      >
                        {badgeConfig[key].label}
                      </span>
                      <span className="text-gray-700 capitalize">
                        {key.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Spicy (Red) */}
              <section className="mb-5">
                <h5 className="text-sm font-semibold mb-2 text-gray-700">
                  Spice Level
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`${badgeConfig.spicy.color} text-white px-2 py-1 rounded-full font-medium`}
                    >
                      {badgeConfig.spicy.label}
                    </span>
                    <span className="text-gray-700">Spicy</span>
                  </div>
                </div>
              </section>

              {/* Allergens (Blue) */}
              <section>
                <h5 className="text-sm font-semibold mb-2 text-gray-700">
                  Allergens &amp; Dietary Info
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "gluten-free",
                    "nuts",
                    "dairy",
                    "eggs",
                    "fish",
                    "shellfish",
                    "soy",
                  ].map((key) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <span
                        className={`${badgeConfig[key].color} text-white px-2 py-1 rounded-full font-medium`}
                      >
                        {badgeConfig[key].label}
                      </span>
                      <span className="text-gray-700 capitalize">
                        {key.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="px-4 py-3 border-t border-gray-200">
              <button
                onClick={() => setShowLegend(false)}
                className="w-full px-4 py-2 rounded-md font-semibold text-white"
                style={{ backgroundColor: menu.theme.accent }}
              >
                Close
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
