"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import MainCard from "./components/MainCard";
import getTranslation from "./localization/constants";

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const [method, setMethod] = useState("");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = getTranslation(lang);

  const handleContinue = () => {
    if (method) {
      router.push(`/cipher/${method}?lang=${lang}`);
    } else {
      toast.error(t.alert_choose, {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans px-4 bg-black overflow-hidden">
      <Toaster position="top-center" />
      <div className="relative z-10 w-full flex items-center justify-center">
        <MainCard
          lang={lang}
          setLang={setLang}
          method={method}
          setMethod={setMethod}
          t={t}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
