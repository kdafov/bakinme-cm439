import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BrandCard() {
  const { t } = useTranslation();

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="flex-shrink-0 p-2">
      {/* Brand Image */}
      <div className="relative w-full h-[70px] rounded-lg shadow-lg mb-2 overflow-hidden bg-gradient-to-br from-[#DC7129] to-[#F7C884] border-1 border-[#462305]">
        <img
          src="/landscape-intro.png"
          alt="BakinMeCrazy"
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out
            ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 70%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 70%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5" />
      </div>

      {/* Brand Name */}
      <h2 className="text-xl font-bold text-[#462305] text-center mb-1 fuzzy-bubbles-bold">
        Bakin' Me Crazy
      </h2>

      {/* Micro Description */}
      <p
        className="text-sm bg-clip-text text-transparent text-center max-w-md mx-auto mb-3 fuzzy-bubbles-bold"
        style={{
          backgroundImage:
            "linear-gradient(to right, #462305, #8B5A2B, #462305, #8B5A2B)",
        }}
      >
        {t("xsSubTitle")}
      </p>
    </div>
  );
}
