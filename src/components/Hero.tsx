import { ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  onHideLanding: () => void;
};

export default function Hero({ visible, onHideLanding }: Props) {
  const { t } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const handleScroll = () => {
      if (window.scrollY > 50 && !isTransitioning) {
        setIsTransitioning(true);
        setShouldFadeOut(true);

        setTimeout(() => {
          onHideLanding();

          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 50);
        }, 250);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, onHideLanding, isTransitioning]);

  if (!visible) return null;

  return (
    <section
      className={`relative h-dvh w-full overflow-hidden bg-gradient-to-br from-[#462305] via-[#DC7129] to-[#F7C884] transition-all duration-700 ${
        shouldFadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div> */}
      <div className="absolute inset-0 opacity-35">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
        url('/cookie.svg'), url('/brownie.svg'), url('/cake.svg'), url('/shake.svg'),
        url('/cake.svg'), url('/brownie.svg'), url('/cookie.svg'), url('/shake.svg')
      `,
            backgroundPosition: `
        15% 20%, 90% 25%, 10% 90%, 95% 50%, 
        10% 5%, 10% 55%, 85% 85%, 55% 10%
      `,
            backgroundSize: "70px 70px",
            backgroundRepeat: "no-repeat",
            filter: "hue-rotate(180deg) saturate(0.9) brightness(0.5)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl">
          <img
            src="/logo.svg"
            alt="BakinMeCrazy Logo"
            className="h-24 w-24 object-contain"
          />
        </div>

        {/* Business Name */}
        <h1 className="mb-8 text-5xl font-bold text-white drop-shadow-lg sm:text-6xl lg:text-7xl fuzzy-bubbles-bold">
          Bakin' Me Crazy
        </h1>

        {/* Description */}
        <div className="mb-12 max-w-2xl">
          <p className="text-lg text-white/90 drop-shadow-md sm:text-xl lg:text-2xl leading-relaxed fuzzy-bubbles-regular">
            {t("subtitle")}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-[#F7C884]/20 blur-xl" />
        <div className="absolute top-1/3 right-20 h-16 w-16 rounded-full bg-white/5 blur-lg" />
      </div>

      {/* Scroll Indicator - Arrows with Text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500">
        <div className="flex flex-col items-center">
          <div className="flex flex-col space-y-2 animate-bounce">
            <ChevronUp className="h-10 w-10 text-white/70" />
            <ChevronUp className="h-10 w-10 text-white/50 -mt-8" />
            <ChevronUp className="h-10 w-10 text-white/30 -mt-8" />
          </div>
          <p className="text-[#462305] text-2xl font-bold tracking-wide fuzzy-bubbles-bold">
            {t("swipeUpText")}
          </p>
        </div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#462305]/50 to-transparent pointer-events-none" />
    </section>
  );
}
