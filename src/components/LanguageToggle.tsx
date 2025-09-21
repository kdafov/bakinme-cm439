import { Globe } from "lucide-react";

type Props = { language: string; onToggle: () => void };

export default function LanguageToggle({ language, onToggle }: Props) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
      </button>
    </div>
  );
}
