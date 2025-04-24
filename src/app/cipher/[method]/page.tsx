"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LanguageSelector from "../../components/LanguageSelector";
import { Toaster } from "react-hot-toast";
import { showError } from "../../utils/notification";
import getTranslation from "../../localization/constants";
import { BackIcon } from "@/app/components/icons/Back";

export default function CipherPage({ params }: { params: { method: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<null | string>(null);
  const [text, setText] = useState("");
  const [param, setParam] = useState("");
  const [decrypt, setDecrypt] = useState(false);
  const [result, setResult] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    const storedLang = urlLang || localStorage.getItem("lang") || "ua";
    setLang(storedLang);
  }, [searchParams]);

  const t = getTranslation(lang ?? "ua");

  const getParamLabel = () => {
    switch (params.method) {
      case "caesar":
        return t.caesar_label;
      case "vigenere":
        return t.vigenere_label;
      case "xor":
        return t.xor_label;
      case "atbash":
        return t.atbash_label;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans px-4 bg-black overflow-hidden">
      <Toaster position="top-center" />
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black border border-[#d4af37]/30 p-8 rounded-3xl w-full max-w-xl shadow-2xl animate-fade-in">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#d4af37]/20 rounded-full blur-3xl z-0" />
        <div className="relative z-10 w-full">
          <div className="flex justify-end mb-2">
            <LanguageSelector lang={lang!} setLang={setLang} />
          </div>
          <button
            className="absolute top-4 left-4 text-[#d4af37] hover:text-white transition-colors"
            onClick={() => router.push(`/?lang=${lang}`)}
            title="Back"
          >
            {BackIcon()}
          </button>
          <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight text-[#d4af37] drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)]">
            {t.cipher}: <span className="capitalize">{getParamLabel()}</span>
          </h1>

          <label className="block mb-2 text-[#e0c172] text-sm font-medium">
            {t.input_text}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#121212] border border-[#d4af37]/50 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
            rows={5}
          />

          {getParamLabel() && (
            <div className="mb-4">
              <label className="block mb-2 text-[#e0c172] text-sm font-medium">
                {getParamLabel()}
              </label>
              <input
                value={param}
                onChange={(e) => setParam(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#121212] border border-[#d4af37]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
              />
            </div>
          )}

          <label className="inline-flex items-center mb-4 select-none">
            <input
              type="checkbox"
              checked={decrypt}
              onChange={(e) => setDecrypt(e.target.checked)}
              className="form-checkbox h-5 w-5 text-[#d4af37] mr-2 focus:ring-[#d4af37] rounded"
            />
            <span className="text-[#e0c172]">{t.decrypt}</span>
          </label>

          <div className="flex flex-wrap gap-3 mb-5">
            <label className="flex items-center cursor-pointer border border-[#d4af37] text-[#e0c172] font-medium py-2 px-4 rounded-lg bg-transparent hover:bg-[#d4af37]/10 transition">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                // onChange={openFile}
              />
              <span>{t.open_file}</span>
            </label>
            <button
              // onClick={saveResultToDirectory}
              className="border border-[#d4af37] text-[#e0c172] font-medium py-2 px-4 rounded-lg bg-transparent hover:bg-[#d4af37]/10 transition"
            >
              {t.save_result}
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="border border-[#d4af37] text-[#e0c172] font-medium py-2 px-4 rounded-lg bg-transparent hover:bg-[#d4af37]/10 transition"
            >
              {t.history}
            </button>
          </div>

          <button
            // onClick={submitCipher}
            className="bg-[#d4af37] text-black font-semibold py-3 px-6 rounded-lg w-full mb-6 hover:bg-[#e0c172] transition"
          >
            {t.run}
          </button>

          <h2 className="text-lg font-semibold mb-2 text-[#e0c172]">
            {t.result}
          </h2>
          <pre className="bg-[#121212] border border-[#d4af37]/30 p-4 rounded-lg text-sm text-white whitespace-pre-wrap max-h-64 overflow-y-auto">
            {result || "..."}
          </pre>

          {showHistory && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#d4af37]/30 rounded-lg p-6 w-full max-w-xl max-h-[80vh] relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl z-0" />
                <button
                  onClick={() => setShowHistory(false)}
                  className="absolute top-3 right-3 text-[#e0c172] hover:text-white z-10 h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#d4af37]/10"
                >
                  &times;
                </button>
                <h3 className="text-xl font-semibold mb-4 text-[#d4af37] relative z-10">
                  {t.history_title}
                </h3>
                <pre className="bg-[#121212] border border-[#d4af37]/30 p-4 rounded-lg text-sm text-white max-h-96 overflow-y-auto relative z-10">
                  {history || t.log_empty}
                </pre>
                <div className="flex justify-end mt-4 relative z-10">
                  <button
                    onClick={() => setShowHistory(false)}
                    className="border border-[#d4af37] text-[#e0c172] font-medium py-2 px-4 rounded-lg bg-transparent hover:bg-[#d4af37]/10 transition mr-2"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
