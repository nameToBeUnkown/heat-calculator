export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PwaInstallState {
  /** Banner should be visible */
  showBanner: boolean;
  /** Native browser install dialog is available (Chromium) */
  hasNativePrompt: boolean;
  isRunningAsPwa: boolean;
  install: () => Promise<void>;
  dismiss: () => void;
}
