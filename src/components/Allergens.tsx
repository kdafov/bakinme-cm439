import { AlertTriangle, X } from "lucide-react";
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
      icon: "/allergens/soy.svg",
      nameKey: "soyName",
      descKey: "soyDescription",
    },
    {
      icon: "/allergens/milk.svg",
      nameKey: "milkName",
      descKey: "milkDescription",
    },
    {
      icon: "/allergens/nuts.svg",
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 h-full">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black bg-opacity-80 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-opacity-100 transition-all duration-200 border border-black"
        >
          <X color="white" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-[#462305] mt-6 mb-2">
            {t("allergenInformation")}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            {t("allergenNotice")}
          </p>
        </div>

        {/* Allergens List */}
        <div className="px-6 pb-6 space-y-4">
          {allergens.map((allergen, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#FFF8F0] to-[#FFF5E6] rounded-xl border-2 border-[#F7C884]"
            >
              <div className="w-10 h-10 flex-shrink-0">
                <img
                  src={allergen.icon}
                  alt={t(allergen.nameKey)}
                  className="w-full h-full object-contain rounded-full border-1 border-[#6B4423]"
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

          {/* Cross Contamination Warning */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#FFF8F0] to-[#FFF5E6] rounded-xl border border-[#6B4423] mb-6">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="w-8 h-8 text-[#6B4423] mb-2" />
              <p className="text-[#6B4423] font-medium">
                {t("crossContaminationNote")}
              </p>
            </div>
          </div>

          {/* Go Back Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#9A4A0B]/85 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            {t("goBack")}
          </button>
        </div>
      </div>
    </div>
  );
}
