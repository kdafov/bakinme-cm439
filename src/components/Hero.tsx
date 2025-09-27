import { useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  isActive: boolean;
  goMenu: () => void;
};

export default function Hero({ isActive, goMenu }: Props) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartY = useRef<number | null>(null);

  const handleWheel = (e: WheelEvent) => {
    if (!isActive) return;
    if (e.deltaY > 12) {
      if (e.cancelable) e.preventDefault();
      goMenu();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!isActive) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isActive || touchStartY.current == null) return;
    const deltaY = touchStartY.current - e.touches[0].clientY;
    if (deltaY > 24) {
      if (e.cancelable) e.preventDefault();
      touchStartY.current = null;
      goMenu();
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, goMenu]);

  const textShadowStyle = {
    textShadow: `
      4px 4px 8px rgba(0, 0, 0, 1),
      2px 2px 4px rgba(0, 0, 0, 1),
      6px 6px 12px rgba(0, 0, 0, 0.8)
    `
      .replace(/\s+/g, " ")
      .trim(),
  };

  const arrowUpClasses = [
    "h-10 w-10 text-[#25150d]/95 drop-shadow-[0_0_8px_#ffffff]",
    "h-10 w-10 text-[#25150d]/80 -mt-7 drop-shadow-[0_0_8px_#ffffff]",
    "h-10 w-10 text-[#25150d]/70 -mt-7 drop-shadow-[0_0_8px_#ffffff]",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-[#462305] via-[#DC7129] to-[#F7C884]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/home-experience-background.jpeg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-2 text-center drop-shadow-[0_0_8px_#fff]">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-96 w-full object-contain mb-8"
        />

        <div className="mb-12 max-w-2xl">
          <p
            className="text-2xl text-white sm:text-xl lg:text-2xl leading-relaxed bakinme-font max-w-sm font-bold"
            style={textShadowStyle}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={goMenu}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col space-y-1 animate-bounce">
            {arrowUpClasses.map((className, index) => (
              <ChevronUp key={index} className={className} />
            ))}
          </div>
          <p
            className="text-[#25150d] text-2xl font-bold tracking-wide fuzzy-bubbles-bold drop-shadow-[0_0_8px_#000]"
            style={{ textShadow: "0px 2px 6px rgba(255, 255, 255, 0.7)" }}
          >
            {t("swipeUpText")}
          </p>
        </div>
      </button>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#462305]/50 to-transparent pointer-events-none" />
    </section>
  );
}
