import { Globe } from "lucide-react";
import { useState } from "react";

type Props = {
  language: string;
  onToggle: (language: string) => void;
};

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "bg", label: "BG" },
];

export default function LanguageToggle({ language, onToggle }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (langCode: string) => {
    onToggle(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-3 right-3 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}

      <div className="relative z-10">
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute top-0 right-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full overflow-hidden transition-all duration-300 ease-out ${
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
              <Globe className="h-4 w-4 text-white" />
            </div>
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 whitespace-nowrap ${
                  language === lang.code ? "bg-white/10" : ""
                } ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
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
