import "@/i18n";
import { useLanding } from "@/hooks/useLanding";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import MenuPage from "@/components/Menu";

export default function App() {
  const { showLanding, isLoading, language, toggleLanguage, hideLanding } =
    useLanding();

  if (isLoading) {
    return (
      <div className="h-dvh bg-gradient-to-b from-[#F7C884]/10 to-white" />
    );
  }

  return (
    <div className="relative">
      {showLanding && (
        <LanguageToggle language={language} onToggle={toggleLanguage} />
      )}
      <Hero visible={showLanding} onHideLanding={hideLanding} />
      <MenuPage />
    </div>
  );
}
