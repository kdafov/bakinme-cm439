import { useState, type ComponentType } from "react";
import "./App.css";
import PhotoGridNamesOnly from "./PhotoGridNamesOnly";
import PhotoGridNamesAndPrices from "./PhotoGridNamesAndPrices";
import TabsAndRowsOnly from "./TabsAndRowsOnly";
import TabsAndRowsWithPrices from "./TabsAndRowsWithPrices";
import Masonry from "./Masonry";

type View =
  | "photoGridNamesOnly"
  | "photoGridNamesAndPrices"
  | "tabbedRowsNoPrices"
  | "tabbedRowsWithPrices"
  | "hybridMasonryWithBanner";

type ViewDef = { label: string; Comp: ComponentType };

const VIEWS: Record<View, ViewDef> = {
  photoGridNamesOnly: {
    label: "Grid Menu",
    Comp: PhotoGridNamesOnly,
  },
  photoGridNamesAndPrices: {
    label: "Grid Menu + €",
    Comp: PhotoGridNamesAndPrices,
  },
  tabbedRowsNoPrices: { label: "Tabs & Rows", Comp: TabsAndRowsOnly },
  tabbedRowsWithPrices: {
    label: "Tabs & Rows + €",
    Comp: TabsAndRowsWithPrices,
  },
  hybridMasonryWithBanner: {
    label: "Masonry",
    Comp: Masonry,
  },
};

export default function App() {
  const [view, setView] = useState<View>("photoGridNamesOnly");
  const Active = VIEWS[view].Comp;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7C884]/20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[#F7C884]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-2">
          {(Object.keys(VIEWS) as View[]).map((k) => (
            <button
              key={k}
              onClick={() => setView(k)}
              className={`px-3 py-1.5 rounded-xl border transition
                ${
                  view === k
                    ? "bg-[#DC7129] text-white border-[#DC7129]"
                    : "bg-white text-[#462305] border-[#F7C884] hover:bg-[#F7C884]/30"
                }`}
              aria-pressed={view === k}
            >
              {VIEWS[k].label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl p-4">
        <div
          key={view}
          className="rounded-2xl bg-white shadow border border-[#F7C884]"
        >
          <Active />
        </div>
      </main>
    </div>
  );
}
