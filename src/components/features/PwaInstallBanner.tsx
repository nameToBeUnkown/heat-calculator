import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Smartphone, Share } from "lucide-react";
import type { PwaInstallState } from "../../types/pwa";

interface PwaInstallBannerProps {
  state: PwaInstallState;
}

function ManualInstructions({ onClose }: { onClose: () => void }) {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <motion.div
      key="pwa-instructions"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
    >
      <div className="bg-stone-900 text-white rounded-2xl shadow-2xl p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-stone-800 rounded-xl p-2 shrink-0">
              <Smartphone className="w-4 h-4 text-stone-300" />
            </div>
            <p className="text-sm font-semibold">Як встановити додаток</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрити"
            className="text-stone-500 hover:text-stone-300 transition-colors p-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {isIos ? (
          <ol className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
            <li>
              1. Натисніть{" "}
              <Share className="w-3.5 h-3.5 inline-block text-stone-300" />{" "}
              <strong className="text-stone-200">«Поділитись»</strong> внизу
              браузера
            </li>
            <li>
              2. Оберіть{" "}
              <strong className="text-stone-200">«На Початковий екран»</strong>
            </li>
            <li>
              3. Натисніть <strong className="text-stone-200">«Додати»</strong>
            </li>
          </ol>
        ) : (
          <ol className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
            <li>
              1. Відкрийте меню браузера{" "}
              <strong className="text-stone-200">(⋮ або ≡)</strong>
            </li>
            <li>
              2. Оберіть{" "}
              <strong className="text-stone-200">«Встановити додаток»</strong>{" "}
              або{" "}
              <strong className="text-stone-200">
                «Додати на головний екран»
              </strong>
            </li>
          </ol>
        )}
      </div>
    </motion.div>
  );
}

export function PwaInstallBanner({ state }: PwaInstallBannerProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstallClick = async () => {
    if (state.hasNativePrompt) {
      await state.install();
    } else {
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowInstructions(false);
    state.dismiss();
  };

  return (
    <AnimatePresence mode="wait">
      {state.showBanner && !showInstructions && (
        <motion.div
          key="pwa-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
        >
          <div className="bg-stone-900 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-4">
            <div className="bg-stone-800 rounded-xl p-2.5 shrink-0">
              <Smartphone className="w-5 h-5 text-stone-300" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">
                Встановити додаток
              </p>
              <p className="text-xs text-stone-400 mt-0.5 leading-snug">
                Швидкий доступ без браузера
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 bg-white text-stone-900 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Додати
              </button>
              <button
                onClick={handleDismiss}
                aria-label="Закрити"
                className="text-stone-500 hover:text-stone-300 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {state.showBanner && showInstructions && (
        <ManualInstructions onClose={handleDismiss} />
      )}
    </AnimatePresence>
  );
}
