import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Banner from "./Banner";
import CategoriesStrip from "./CategoriesStrip";
import MenuSection from "./MenuSection";
import MenuItem from "./MenuItem";
import { menu_EN } from "../data/menu_en";
import { menu_ES } from "../data/menu_es";
import { menu_DE } from "@/data/menu_de";
import { menu_IT } from "@/data/menu_it";
import { menu_FR } from "@/data/menu_fr";
import SocialFooter from "./Socials";
import type { MenuEntry, MenuItem as MenuItemType } from "../data/types";

interface MenuItemData extends MenuItemType {
  sectionTitle?: string;
}

function isMenuItem(entry: MenuEntry): entry is MenuItemType {
  return "price" in entry;
}

export default function MenuPage() {
  const { i18n, t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("cookies");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItemData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const menuData = useMemo(() => {
    switch (i18n.language) {
      case "es":
        return menu_ES;
      case "de":
        return menu_DE;
      case "it":
        return menu_IT;
      case "fr":
        return menu_FR;
      default:
        return menu_EN;
    }
  }, [i18n.language]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const allItems = menuData.sections.flatMap((section) =>
        section.items.filter(isMenuItem).map((item) => ({
          ...item,
          sectionTitle: section.title,
        }))
      );

      const filtered = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, menuData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized || searchQuery.trim()) return;

    const handleScroll = () => {
      if (isUserScrolling) return;

      const sections = menuData.sections;
      let currentSection = sections[0].id;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && menuContentRef.current) {
          const rect = element.getBoundingClientRect();
          const containerRect = menuContentRef.current.getBoundingClientRect();

          if (rect.top <= containerRect.top + 150) {
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
  }, [searchQuery, menuData, isInitialized, isUserScrolling]);

  const handleCategoryClick = (categoryId: string) => {
    if (!isInitialized) return;

    setIsUserScrolling(true);
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

      setTimeout(() => {
        setIsUserScrolling(false);
      }, 600);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section data-menu-section className="relative h-dvh">
      <div
        className="absolute inset-0 bg-[url('/home-experience-background.jpeg')] bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative h-full">
        <div className="h-full flex flex-col">
          <Banner />

          <CategoriesStrip
            categories={menuData.categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            onSearch={handleSearch}
          />

          <div ref={menuContentRef} className="flex-1 overflow-auto">
            <div className="pt-6 space-y-8">
              {searchQuery.trim() ? (
                <div className="mb-8">
                  <div className="mb-6 mx-6">
                    <h2 className="text-2xl font-bold text-[#462305] pacifico-regular">
                      {t("searchResults")}
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
                          description={item.description || ""}
                          price={item.price}
                          allergies={item.allergies}
                          passiveAllergies={item.passiveAllergies}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#DC7129] to-[#F7C884] flex items-center justify-center opacity-90">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <p className="text-black font-semibold">
                        {t("noItemsFound", { query: searchQuery })}
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

                  <SocialFooter />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
