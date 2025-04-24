import React, { useRef, useState, useEffect } from "react";
import { LanguageDropMenuIcon } from "./icons/DropMenus";

interface Props {
  lang: string;
  setLang: (lang: string) => void;
}

const LANGS = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "ua", label: "Українська" },
];

export default function LanguageSelector({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="flex justify-end mb-4">
      <div ref={ref} className="relative">
        <button
          className="flex items-center gap-1 bg-dark border border-border text-accent rounded px-2 py-1 text-xs focus:outline-none transition shadow min-w-[70px]"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {LANGS.find((l) => l.value === lang)?.label || lang}
          {LanguageDropMenuIcon({ open })}
        </button>
        <div
          className={`absolute right-0 mt-1 min-w-full bg-dark border border-border rounded shadow transition-all duration-200 z-10 overflow-hidden
            ${
              open
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }
          `}
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            background: "rgba(0, 0, 0, 0.9)",
          }}
        >
          <ul className="py-1 text-xs" role="listbox">
            {LANGS.map((l) => (
              <li key={l.value}>
                <button
                  className={`w-full text-left px-3 py-1 hover:bg-primary/10 transition ${
                    lang === l.value ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => {
                    setLang(l.value);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={lang === l.value}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
