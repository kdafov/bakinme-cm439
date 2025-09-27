import "@/i18n";
import { useAppState } from "./hooks/useAppState";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import MenuPage from "@/components/Menu";

export default function App() {
  const { isLoading, language, setLanguage } = useAppState();

  const scrollToMenu = () => {
    const menuElement = document.getElementById("menu-section");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[100svh] bg-gradient-to-b from-[#F7C884]/10 to-white" />
    );
  }

  return (
    <div className="h-[100svh] overflow-y-auto snap-y snap-mandatory">
      <LanguageToggle language={language} onToggle={setLanguage} />

      {/* Hero Section */}
      <section className="snap-start h-[100svh]">
        <Hero goMenu={scrollToMenu} />
      </section>

      {/* Menu Section */}
      <section id="menu-section" className="snap-start h-[100svh]">
        <MenuPage />
      </section>
    </div>
  );
}
