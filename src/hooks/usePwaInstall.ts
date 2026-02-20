import { useState, useEffect, useCallback, useRef } from "react";
import type { BeforeInstallPromptEvent, PwaInstallState } from "../types/pwa";

const PWA_QUERY_PARAM = "pwa";
const PWA_DISMISSED_KEY = "pwa-install-dismissed";

function getIsRunningAsPwa(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get(PWA_QUERY_PARAM) === "true";
}

export function usePwaInstall(): PwaInstallState {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const isRunningAsPwa = getIsRunningAsPwa();
  const alreadyDismissed = sessionStorage.getItem(PWA_DISMISSED_KEY) === "true";

  // Show the banner proactively — not gated on beforeinstallprompt
  const [showBanner, setShowBanner] = useState(
    !isRunningAsPwa && !alreadyDismissed,
  );
  const [hasNativePrompt, setHasNativePrompt] = useState(false);

  useEffect(() => {
    if (isRunningAsPwa) return;

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setHasNativePrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isRunningAsPwa]);

  const install = useCallback(async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") {
      deferredPrompt.current = null;
      setHasNativePrompt(false);
      setShowBanner(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(PWA_DISMISSED_KEY, "true");
    setShowBanner(false);
  }, []);

  return { showBanner, hasNativePrompt, isRunningAsPwa, install, dismiss };
}
