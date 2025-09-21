import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BrandHeader from "./BrandHeader";
import CategoriesStrip from "./CategoriesStrip";
import MenuSection from "./MenuSection";
import MenuItem from "./MenuItem";
import { menu_EN } from "@/data/menu_EN";
import { menu_ES } from "@/data/menu_es";
import SocialFooter from "./Socials";

interface MenuItemData {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  sectionTitle?: string;
}

export default function MenuPage() {
  const { i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("cookies");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItemData[]>([]);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const menuData = useMemo(() => {
    return i18n.language === "es" ? menu_ES : menu_EN;
  }, [i18n.language]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const allItems = menuData.sections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          sectionTitle: section.title,
        }))
      );

      const filtered = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, menuData]);

  useEffect(() => {
    if (searchQuery.trim()) return;

    const handleScroll = () => {
      const sections = menuData.sections;
      let currentSection = sections[0].id;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const containerRect = menuContentRef.current?.getBoundingClientRect();

          if (containerRect && rect.top <= containerRect.top + 100) {
            currentSection = section.id;
          }
        }
      });

      setActiveCategory(currentSection);
    };

    const menuContainer = menuContentRef.current;
    if (menuContainer) {
      menuContainer.addEventListener("scroll", handleScroll, { passive: true });
      return () => menuContainer.removeEventListener("scroll", handleScroll);
    }
  }, [searchQuery, menuData]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");

    const element = document.getElementById(categoryId);
    if (element && menuContentRef.current) {
      const containerRect = menuContentRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = menuContentRef.current.scrollTop;
      const targetScroll = scrollTop + elementRect.top - containerRect.top - 20;

      menuContentRef.current.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="h-dvh bg-gradient-to-b from-[#F7C884]/10 to-white overflow-hidden">
      <div className="h-full flex flex-col">
        <BrandHeader />

        <CategoriesStrip
          categories={menuData.categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          onSearch={handleSearch}
        />

        <div
          ref={menuContentRef}
          className="flex-1 px-6 pb-6 overflow-auto scroll-smooth"
        >
          <div className="py-6 space-y-8">
            {searchQuery.trim() ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#462305] pacifico-regular">
                    {i18n.language === "es"
                      ? "Resultados de búsqueda"
                      : "Search Results"}{" "}
                    ({filteredItems.length})
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#DC7129] to-[#F7C884] rounded-full mt-2"></div>
                </div>

                {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <MenuItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#DC7129] to-[#F7C884] flex items-center justify-center opacity-50">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <p className="text-gray-500">
                      {i18n.language === "es"
                        ? `No se encontraron elementos para "${searchQuery}"`
                        : `No items found for "${searchQuery}"`}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {menuData.sections.map((section) => (
                  <MenuSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    items={section.items}
                  />
                ))}

                {/* Add SocialFooter here */}
                <SocialFooter />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
