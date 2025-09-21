import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import i18n from "@/i18n";

export function useLanding() {
  const [hasSeenLanding, setHasSeenLanding] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const seenLanding = Cookies.get("hasSeenLanding");
    const hasSeenBefore = seenLanding === "true";

    setHasSeenLanding(hasSeenBefore);
    setShowLanding(!hasSeenBefore);

    const savedLanguage = Cookies.get("preferredLanguage");
    let detectedLanguage = "en";

    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      detectedLanguage = savedLanguage;
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) {
        detectedLanguage = "es";
      }
    }

    setLanguage(detectedLanguage);
    i18n.changeLanguage(detectedLanguage);
    setIsLoading(false);

    const onLangChanged = (lng: string) => setLanguage(lng);
    i18n.on("languageChanged", onLangChanged);
    return () => i18n.off("languageChanged", onLangChanged);
  }, []);

  const toggleLanguage = () => {
    const next = language === "en" ? "es" : "en";
    setLanguage(next);
    i18n.changeLanguage(next);
    Cookies.set("preferredLanguage", next, { expires: 30, path: "/" });
  };

  const hideLanding = () => {
    Cookies.set("hasSeenLanding", "true", { expires: 30, path: "/" });
    setHasSeenLanding(true);
    setShowLanding(false);
  };

  return {
    hasSeenLanding,
    showLanding,
    isLoading,
    language,
    toggleLanguage,
    hideLanding,
  };
}
