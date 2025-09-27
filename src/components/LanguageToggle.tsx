import { languages } from "@/data/languages";
import { Globe } from "lucide-react";
import { useState } from "react";

type Props = {
  language: string;
  onToggle: (language: string) => void;
};

export default function LanguageToggle({ language, onToggle }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (langCode: string) => {
    onToggle(langCode);
    setIsOpen(false);
  };

  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const buttonBaseClasses =
    "px-3 py-2 text-sm font-medium text-black transition-all duration-300 whitespace-nowrap focus:outline-none hover:bg-black/10";

  const getLanguageButtonClasses = (langCode: string) => {
    const isActive = language === langCode;
    const animationClasses = isOpen
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-4";

    return `${buttonBaseClasses} ${animationClasses} ${
      isActive ? "bg-black/20 font-semibold" : ""
    }`;
  };

  return (
    <div className="fixed top-3 right-3 z-50">
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={closeDropdown} />}

      <div className="relative z-10">
        {/* Main Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white backdrop-blur-sm border border-black text-black hover:bg-gray-50 transition-all duration-300 focus:outline-none"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-semibold">
            {language.toUpperCase()}
          </span>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute top-0 right-0 bg-white backdrop-blur-sm border border-black text-black rounded-full overflow-hidden transition-all duration-300 ease-out ${
            isOpen
              ? "w-auto opacity-100 scale-100"
              : "w-0 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex">
            <div
              className={`flex items-center px-2 transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <Globe className="h-4 w-4 text-black" />
            </div>
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={getLanguageButtonClasses(lang.code)}
                style={{
                  transitionDelay: isOpen ? `${(index + 1) * 75}ms` : "0ms",
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
