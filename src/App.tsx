import "@/i18n";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "./hooks/useAppState";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import MenuPage from "@/components/Menu";

export default function App() {
  const { isLoading, language, setLanguage, view, setView } = useAppState();

  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const target = view === "intro" ? introRef.current : menuRef.current;
    if (!container || !target) return;

    setIsTransitioning(true);
    container.classList.add("snap-none");
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });

    const timer = window.setTimeout(() => {
      container.classList.remove("snap-none");
      setIsTransitioning(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (isTransitioning) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === introRef.current && view !== "intro")
            setView("intro");
          if (entry.target === menuRef.current && view !== "menu")
            setView("menu");
        });
      },
      { root: container, threshold: 0.9 }
    );

    if (introRef.current) obs.observe(introRef.current);
    if (menuRef.current) obs.observe(menuRef.current);
    return () => obs.disconnect();
  }, [isTransitioning, view, setView]);

  if (isLoading)
    return (
      <div className="h-[100svh] bg-gradient-to-b from-[#F7C884]/10 to-white" />
    );

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] overflow-y-auto snap-y snap-mandatory"
      style={{ overscrollBehaviorY: "contain" }}
    >
      <LanguageToggle language={language} onToggle={setLanguage} />

      <section ref={introRef} className="snap-start snap-always h-[100svh]">
        <Hero
          isActive={view === "intro" && !isTransitioning}
          goMenu={() => setView("menu")}
        />
      </section>

      <section ref={menuRef} className="snap-start snap-always h-[100svh]">
        <MenuPage />
      </section>
    </div>
  );
}
