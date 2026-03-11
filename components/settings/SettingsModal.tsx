"use client";
import { Dialog, DialogBackdrop, DialogTitle } from "@headlessui/react";
import { CurrencyToggle } from "./CurrencyToggle";
import { ClearDataButton } from "./ClearDataButton";

import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import ThemeToggle from "@/components/ui/ThemeToggle";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "hi", label: "हिन्दी" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "bn", label: "বাংলা" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "tr", label: "Türkçe" },
  { code: "it", label: "Italiano" },
  { code: "ko", label: "한국어" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "fa", label: "فارسی" },
];

function SettingsModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { t, i18n } = useTranslation('common');
  const [language, setLanguage] = useState(i18n?.resolvedLanguage || i18n?.language || "en");
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  // Only run on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScrollbar = localStorage.getItem("showScrollbar");
      if (storedScrollbar !== null) setShowScrollbar(storedScrollbar === "true");
      const storedMobile = localStorage.getItem("mobileMode");
      if (storedMobile !== null) setMobileMode(storedMobile === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("language");
      if (stored) {
        setLanguage(stored);
        if (typeof i18n.changeLanguage === 'function') {
          i18n.changeLanguage(stored);
        }
      }
    }
  }, [i18n]);
  useEffect(() => {
    localStorage.setItem("language", language);
    if (typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(language);
    }
    window.dispatchEvent(new CustomEvent("language-change", { detail: language }));
  }, [language, i18n]);
  useEffect(() => {
    localStorage.setItem("showScrollbar", showScrollbar.toString());
    window.dispatchEvent(new CustomEvent("show-scrollbar-change", { detail: showScrollbar }));
  }, [showScrollbar]);
  useEffect(() => {
    localStorage.setItem("mobileMode", mobileMode.toString());
    window.dispatchEvent(new CustomEvent("mobile-mode-change", { detail: mobileMode }));
  }, [mobileMode]);
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-gradient-to-br from-slate-900/90 via-primary/10 to-card/90 border border-white/10 rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl backdrop-blur-xl">
        <DialogTitle as="h2" className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <span role="img" aria-label="settings">⚙️</span> {t('settings')}
        </DialogTitle>
        <div className="mb-6">
          <div className="mb-2 font-semibold text-lg text-white">{t('theme')}</div>
          <ThemeToggle />
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={showScrollbar}
              onChange={e => setShowScrollbar(e.target.checked)}
            />
            Show Scrollbar
          </label>
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={mobileMode}
              onChange={e => setMobileMode(e.target.checked)}
            />
            Mobile/Tab Mode
          </label>
        </div>
        <div className="mb-6">
          <label htmlFor="language" className="block text-slate-300 mb-2 font-medium">{t('language')}</label>
          <select
            id="language"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full rounded border border-white/10 bg-slate-800 text-white p-2"
            aria-label={t('language')}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
        <CurrencyToggle />
        <ClearDataButton />
        <button onClick={onClose} className="mt-8 w-full rounded bg-emerald-600 text-white py-2 font-semibold hover:bg-emerald-700 transition">{t('close')}</button>
      </div>
    </Dialog>
  );
}

export default SettingsModal;
// Why: Modals keep settings accessible but unobtrusive.
