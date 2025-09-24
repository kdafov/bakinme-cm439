import { useTranslation } from "react-i18next";
import type { Allergen } from "../data/types";
import { X } from "lucide-react";

interface ItemInformationProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  allergies?: Allergen[];
  passiveAllergies?: Allergen[];
}

const getAllergenIcon = (allergen: Allergen): string => {
  return `/allergens/${allergen}.svg`;
};

export default function ItemInformation({
  isOpen,
  onClose,
  image,
  title,
  description,
  allergies = [],
  passiveAllergies = [],
}: ItemInformationProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 h-full">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-opacity-100 transition-all duration-200"
        >
          <X />
        </button>

        {/* Image at top */}
        {image && (
          <div className="w-full h-48 bg-gradient-to-br from-[#DC7129] to-[#F7C884] overflow-hidden rounded-t-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#462305] mb-2">{title}</h3>

          {/* Description */}
          {description && (
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Allergens Section */}
          {(allergies.length > 0 || passiveAllergies.length > 0) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#462305] mb-3">
                {t("allergenInformation")}
              </h3>

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {t("allergenNotice")}
              </p>

              {/* Mandatory Allergens */}
              {allergies.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-[#6B4423] mb-2">
                    {t("contains")}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergen) => (
                      <div
                        key={allergen}
                        className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-full"
                      >
                        <img
                          src={getAllergenIcon(allergen)}
                          alt={allergen}
                          className="w-6 h-6"
                        />
                        <span className="text-sm text-red-800 capitalize font-semibold">
                          {t(`${allergen}Name`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passive Allergens */}
              {passiveAllergies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-[#6B4423] mb-2">
                    {t("mayContain")}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {passiveAllergies.map((allergen) => (
                      <div
                        key={allergen}
                        className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full"
                      >
                        <img
                          src={getAllergenIcon(allergen)}
                          alt={allergen}
                          className="w-6 h-6 opacity-70"
                        />
                        <span className="text-sm text-yellow-800 capitalize">
                          {t(`${allergen}Name`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Go Back Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#DC7129]/85 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            {t("goBack")}
          </button>
        </div>
      </div>
    </div>
  );
}
