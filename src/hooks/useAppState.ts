import { useEffect, useState } from "react";
import i18n from "@/i18n";

export type ViewState = "intro" | "menu";

export function useAppState() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [view, setView] = useState<ViewState>("intro");

  useEffect(() => {
    let detectedLanguage = "en";
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("es")) detectedLanguage = "es";
    else if (browserLang.startsWith("de")) detectedLanguage = "de";
    else if (browserLang.startsWith("it")) detectedLanguage = "it";
    else if (browserLang.startsWith("bg")) detectedLanguage = "bg";
    setLanguage(detectedLanguage);
    i18n.changeLanguage(detectedLanguage);
    setIsLoading(false);

    const onLangChanged = (lng: string) => setLanguage(lng);
    i18n.on("languageChanged", onLangChanged);
    return () => i18n.off("languageChanged", onLangChanged);
  }, []);

  const setSelectedLanguage = (selectedLang: string) => {
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return {
    isLoading,
    language,
    setLanguage: setSelectedLanguage,
    view,
    setView,
  };
}
