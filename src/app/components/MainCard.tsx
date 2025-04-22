import { useEffect } from "react";
import { TransactionData } from "../localization/types";
import LanguageSelector from "./LanguageSelector";
import MethodSelector from "./MethodSelector";

export default function MainCard({
  lang,
  setLang,
  method,
  setMethod,
  t,
  onContinue,
}: {
  lang: string;
  setLang: (lang: string) => void;
  method: string;
  setMethod: (method: string) => void;
  t: TransactionData;
  onContinue: () => void;
}) {
  useEffect(() => {
    if (method) {
      onContinue();
    }
  }, [method, onContinue]);

  return (
    <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black border border-[#d4af37]/30 p-0 rounded-3xl w-full max-w-xl shadow-2xl flex flex-col items-center overflow-hidden animate-fade-in min-h-[400px]">
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#d4af37]/20 rounded-full blur-3xl z-0" />
      <div className="relative z-10 w-full flex flex-col items-center px-10 py-12">
        <div className="w-full flex justify-end mb-2 relative z-20">
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight text-[#d4af37] drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)] relative z-10">
          {t.title}
        </h1>
        <div className="w-full mb-8 relative z-10">
          <MethodSelector method={method} setMethod={setMethod} t={t} />
        </div>
      </div>
    </div>
  );
}
