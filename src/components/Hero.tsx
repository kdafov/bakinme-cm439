import { useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  isActive?: boolean;
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

  // const textShadowStyle = {
  //   textShadow: `
  //     4px 4px 8px rgba(0, 0, 0, 0.7),
  //     2px 2px 4px rgba(0, 0, 0, 0.8),
  //     6px 6px 12px rgba(0, 0, 0, 0.8)
  //   `
  //     .replace(/\s+/g, " ")
  //     .trim(),
  // };

  const textShadowStyle = {
    textShadow: `
    2px 2px 4px rgba(0, 0, 0, 0.6),
    1px 1px 2px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.4)
  `
      .replace(/\s+/g, " ")
      .trim(),
  };

  const arrowUpClasses = [
    "h-10 w-10 text-white",
    // "h-10 w-10 text-white -mt-7",
    "h-10 w-10 text-white -mt-7",
  ];

  const arrowShadowStyle = {
    filter:
      "drop-shadow(4px 4px 8px rgba(70, 35, 5, 1)) drop-shadow(2px 2px 4px rgba(70, 35, 5, 1)) drop-shadow(6px 6px 12px rgba(70, 35, 5, 0.8))",
  };

  const menuTextShadowStyle = {
    textShadow: `
      4px 4px 8px rgba(70, 35, 5, 1),
      2px 2px 4px rgba(70, 35, 5, 1),
      6px 6px 12px rgba(70, 35, 5, 0.8),
      1px 1px 2px rgba(70, 35, 5, 1)
    `
      .replace(/\s+/g, " ")
      .trim(),
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-black/15" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-2 text-center drop-shadow-[2px_12px_8px_#fff] pb-10">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-full object-contain mb-4 h-84 sm:h-90 md:h-80 lg:h-96"
        />

        <div className="mb-8 max-w-2xl">
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col space-y-1">
            {arrowUpClasses.map((className, index) => (
              <ChevronUp
                key={index}
                className={`${className} animate-[slideUp_2s_ease-in-out_infinite]`}
                style={{
                  ...arrowShadowStyle,
                  animationDelay: `${index * 0.3}s`,
                  animation: `slideUp 1.5s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          <p
            className="text-white text-2xl font-bold tracking-wide fuzzy-bubbles-bold"
            style={menuTextShadowStyle}
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
