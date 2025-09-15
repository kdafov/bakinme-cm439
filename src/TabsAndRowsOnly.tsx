import { useState } from "react";
import { menu } from "./data";
import type { MenuData, Promo, MenuItem as MenuItemT } from "./types";

type Badge = "vegan" | "spicy" | "gluten-free";

const BadgePill = ({ badge }: { badge: Badge }) => {
  const badgeStyles: Record<Badge, string> = {
    vegan: "bg-green-100 text-green-800",
    spicy: "bg-red-100 text-red-800",
    "gluten-free": "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${badgeStyles[badge]}`}
    >
      {badge}
    </span>
  );
};

const MenuRow = ({ item }: { item: MenuItemT }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-24 h-24 flex-shrink-0">
        <div
          className="w-full h-full bg-gray-200 bg-cover bg-center"
          style={{
            backgroundImage: item.image ? `url(${item.image})` : "none",
          }}
        >
          {!item.image && (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.badges?.map((b) => (
              <BadgePill key={b} badge={b} />
            ))}
          </div>
          {item.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const PromoBar = ({
  promo,
  theme,
}: {
  promo?: Promo;
  theme: MenuData["theme"];
}) => {
  if (!promo) return null;

  return (
    <div
      className="rounded-lg p-4 mb-6 text-white"
      style={{ backgroundColor: promo.background || theme.primary }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{promo.title}</h2>
          {promo.subtitle && (
            <p className="text-sm opacity-90">{promo.subtitle}</p>
          )}
        </div>
        {promo.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/20">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${promo.image})` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function TabsAndRowsOnly() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const getItemsToShow = (): MenuItemT[] => {
    if (activeTab === "all") {
      return menu.categories.flatMap((category) => category.items);
    }
    const activeCategory = menu.categories.find((cat) => cat.id === activeTab);
    return activeCategory?.items ?? [];
  };

  const itemsToShow: MenuItemT[] = getItemsToShow();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PromoBar promo={menu.promo} theme={menu.theme} />

        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "all"
                ? `border-current text-white`
                : `border-transparent text-gray-600 hover:text-gray-800`
            }`}
            style={{
              backgroundColor:
                activeTab === "all" ? menu.theme.accent : "transparent",
              color: activeTab === "all" ? "white" : undefined,
            }}
          >
            All
          </button>
          {menu.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === category.id
                  ? `border-current text-white`
                  : `border-transparent text-gray-600 hover:text-gray-800`
              }`}
              style={{
                backgroundColor:
                  activeTab === category.id ? menu.theme.accent : "transparent",
                color: activeTab === category.id ? "white" : undefined,
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: menu.theme.dark }}
        >
          {activeTab === "all"
            ? "All Items"
            : menu.categories.find((cat) => cat.id === activeTab)?.name}
        </h2>

        <div className="space-y-4">
          {itemsToShow.length > 0 ? (
            itemsToShow.map((item) => <MenuRow key={item.id} item={item} />)
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No items available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
