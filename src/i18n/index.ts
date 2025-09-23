import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/translation.json";
import es from "@/locales/es/translation.json";
import de from "@/locales/de/translation.json";
import it from "@/locales/it/translation.json";
import fr from "@/locales/fr/translation.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      it: { translation: it },
      de: { translation: de },
      fr: { translation: fr },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
