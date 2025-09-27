import { useState } from "react";
import type { Allergen } from "../data/types";
import { useTranslation } from "react-i18next";
import ItemInformation from "./ItemInformation";

interface MenuItemProps {
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  allergies?: Allergen[];
  passiveAllergies?: Allergen[];
  message?: string;
}

export default function MenuItem({
  image,
  title,
  description,
  price,
  allergies = [],
  passiveAllergies = [],
  message,
}: MenuItemProps) {
  const { t } = useTranslation();
  const [showOverlay, setShowOverlay] = useState(false);
  const hasAllergens = allergies.length > 0 || passiveAllergies.length > 0;

  {
    /* Description Item */
  }
  if (message && price === undefined) {
    return (
      <div className="bg-white rounded-xl border border-[#F7C884] mx-6 px-4 py-1">
        <p className="text-[#6B4423] text-sm leading-relaxed">
          {(() => {
            const m = String(message).match(/^([^:]+):(.*)$/s);
            return m ? (
              <>
                <strong className="font-bold">{m[1]}:</strong>
                {m[2]}
              </>
            ) : (
              message
            );
          })()}
        </p>
      </div>
    );
  }

  {
    /* Menu Item */
  }
  return (
    <>
      <div
        className="bg-white rounded-xl border border-[#DC7129]/60 hover:border-[#DC7129]/30 transition-all duration-200 hover:shadow-md overflow-hidden mx-6 cursor-pointer"
        onClick={hasAllergens ? () => setShowOverlay(true) : undefined}
      >
        <div className="flex">
          {/* Image - Full Height */}
          {image && (
            <div className="flex-shrink-0 w-20 bg-gradient-to-br from-[#DC7129] to-[#F7C884] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 py-2 px-4 min-w-0">
            {/* Title */}
            <h3 className="font-semibold text-[#462305] text-lg leading-tight mb-2">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-gray-700 text-sm leading-tight mb-2">
                {description}
              </p>
            )}

            {/* Price and Allergen Tag Row */}
            {price !== undefined && (
              <div className="flex items-center justify-between">
                {/* Allergen Tag */}
                {hasAllergens && (
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 text-xs bg-[#DC7129]/90 text-white rounded-full font-bold">
                      {t("allergensButton")}*
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex-shrink-0">
                  <span className="text-xl font-bold text-[#DC7129] tracking-wide">
                    €{price.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Information Overlay */}
      <ItemInformation
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        image={image}
        title={title}
        description={description}
        price={price}
        allergies={allergies}
        passiveAllergies={passiveAllergies}
      />
    </>
  );
}
