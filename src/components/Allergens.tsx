import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AllergensProps {
  onClose: () => void;
}

export default function Allergens({ onClose }: AllergensProps) {
  const { t } = useTranslation();

  const allergens = [
    {
      icon: "/allergens/gluten.svg",
      nameKey: "glutenName",
      descKey: "glutenDescription",
    },
    {
      icon: "/allergens/crustaceans.svg",
      nameKey: "crustaceansName",
      descKey: "crustaceansDescription",
    },
    {
      icon: "/allergens/egg.svg",
      nameKey: "eggName",
      descKey: "eggDescription",
    },
    {
      icon: "/allergens/fish.svg",
      nameKey: "fishName",
      descKey: "fishDescription",
    },
    {
      icon: "/allergens/peanuts.svg",
      nameKey: "peanutsName",
      descKey: "peanutsDescription",
    },
    {
      icon: "/allergens/soybeans.svg",
      nameKey: "soyName",
      descKey: "soyDescription",
    },
    {
      icon: "/allergens/milk.svg",
      nameKey: "milkName",
      descKey: "milkDescription",
    },
    {
      icon: "/allergens/pinenuts.svg",
      nameKey: "nutsName",
      descKey: "nutsDescription",
    },
    {
      icon: "/allergens/celery.svg",
      nameKey: "celeryName",
      descKey: "celeryDescription",
    },
    {
      icon: "/allergens/mustard.svg",
      nameKey: "mustardName",
      descKey: "mustardDescription",
    },
    {
      icon: "/allergens/sesame.svg",
      nameKey: "sesameName",
      descKey: "sesameDescription",
    },
    {
      icon: "/allergens/sulphites.svg",
      nameKey: "sulphitesName",
      descKey: "sulphitesDescription",
    },
    {
      icon: "/allergens/lupin.svg",
      nameKey: "lupinName",
      descKey: "lupinDescription",
    },
    {
      icon: "/allergens/molluscs.svg",
      nameKey: "molluscsName",
      descKey: "molluscsDescription",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#DC7129]">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#462305]">
              {t("allergenInformation")}
            </h2>
            <button
              onClick={onClose}
              className="text-white bg-[#462305] text-2xl font-bold transition-colors border border-gray-300 hover:border-[#462305] rounded-full w-8 h-8 flex items-center justify-center"
            >
              <X />
            </button>
          </div>
          <p className="text-[#6B4423] mt-2">{t("allergenNotice")}</p>
        </div>

        {/* Allergens List */}
        <div className="p-6 space-y-4">
          {allergens.map((allergen, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#FFF8F0] to-[#FFF5E6] rounded-xl border-2 border-[#F7C884]"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={allergen.icon}
                  alt={t(allergen.nameKey)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#462305] text-lg">
                  {t(allergen.nameKey)}
                </h3>
                <p className="text-[#6B4423] text-sm mt-1">
                  {t(allergen.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-[#DC7129] to-[#F7C884] rounded-b-2xl border-t-2 border-[#DC7129]">
          <p className="text-white text-center font-medium">
            ⚠️ {t("crossContaminationNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
