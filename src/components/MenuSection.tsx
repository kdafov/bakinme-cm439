import { useState } from "react";
import MenuItem from "./MenuItem";
import Allergens from "./Allergens";
import { useTranslation } from "react-i18next";

interface MenuItemData {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface MenuSectionProps {
  id: string;
  title: string;
  items: MenuItemData[];
}

export default function MenuSection({ id, title, items }: MenuSectionProps) {
  const { t } = useTranslation();
  const isFirstSection = id === "cookies";
  const [showAllergens, setShowAllergens] = useState(false);

  return (
    <section id={id} className="mb-8">
      {/* Section Title */}
      <div className="mb-6 mx-6">
        {isFirstSection ? (
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#462305] pacifico-regular">
              {title}
            </h2>
            <button
              onClick={() => setShowAllergens(true)}
              className="text-lg  font-bold transition-colors duration-200 drop-shadow-sm border-2 border-[#462305] px-3 py-1 rounded-lg bg-[#DC7129]  text-white"
            >
              {t("allergensButton")}
            </button>
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-[#462305] pacifico-regular">
            {title}
          </h2>
        )}
        <div className="w-12 h-1 bg-gradient-to-r from-[#DC7129] to-[#F7C884] rounded-full mt-2"></div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>

      {/* Allergens Modal */}
      {showAllergens && <Allergens onClose={() => setShowAllergens(false)} />}
    </section>
  );
}
