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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel: EventListener = (e) => {
      if (!isActive) return;
      const we = e as WheelEvent;
      if (we.deltaY > 12) {
        if (e.cancelable) e.preventDefault();
        goMenu();
      }
    };

    const onTouchStart: EventListener = (e) => {
      if (!isActive) return;
      const te = e as TouchEvent;
      touchStartY.current = te.touches[0].clientY;
    };

    const onTouchMove: EventListener = (e) => {
      if (!isActive || touchStartY.current == null) return;
      const te = e as TouchEvent;
      const dy = touchStartY.current - te.touches[0].clientY;
      if (dy > 24) {
        if (e.cancelable) e.preventDefault();
        touchStartY.current = null;
        goMenu();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [isActive, goMenu]);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-[#462305] via-[#DC7129] to-[#F7C884]"
    >
      <div className="absolute inset-0 opacity-35">
        <img
          src="/home-experience-background.jpeg"
          alt="Background image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-2 text-center">
        <div className="mb-10 flex h-40 w-40 sm:h-36 sm:w-36 lg:h-64 lg:w-64 items-center justify-center rounded-full bg-[#F6C783] backdrop-blur-sm border border-white/30 shadow-2xl p-2">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="mb-5 text-5xl font-bold text-white sm:text-6xl lg:text-7xl fuzzy-bubbles-bold text-shadow-brand">
          BAKIN' ME CRAZY
        </h1>
        <div className="mb-12 max-w-2xl">
          <p className="text-xl text-white sm:text-xl lg:text-2xl leading-relaxed fuzzy-bubbles-regular text-shadow-brand-sub">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <button
        onClick={goMenu}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col space-y-1 animate-bounce">
            <ChevronUp className="h-10 w-10 text-[#462305]/90 drop-shadow-[0_0_8px_#ffffff]" />
            <ChevronUp className="h-10 w-10 text-[#462305]/70 -mt-7 drop-shadow-[0_0_8px_#ffffff]" />
            <ChevronUp className="h-10 w-10 text-[#462305]/50 -mt-7 drop-shadow-[0_0_8px_#ffffff]" />
          </div>
          <p className="text-[#462305] text-2xl font-bold tracking-wide fuzzy-bubbles-bold drop-shadow-[0_0_8px_#ffffff]">
            {t("swipeUpText")}
          </p>
        </div>
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#462305]/50 to-transparent pointer-events-none" />
    </section>
  );
}
