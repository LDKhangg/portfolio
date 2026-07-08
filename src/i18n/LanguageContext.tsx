import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { vi } from "./vi";

type Lang = "en" | "vi";
const STORAGE_KEY = "ldk-lang";

interface LangValue { lang: Lang; toggle: () => void; t: Dict; }

const LanguageContext = createContext<LangValue | null>(null);

function initialLang(): Lang {
  const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return stored === "vi" ? "vi" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "vi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);
  const value = useMemo<LangValue>(() => ({ lang, toggle, t: lang === "en" ? en : vi }), [lang, toggle]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
