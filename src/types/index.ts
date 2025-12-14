// Window information returned by list_windows tool
export interface WindowInfo {
  id: number;
  title: string;
  appName: string;
  screen: number; // Monitor index (0, 1, 2...)
}

// Screenshot result
export interface ScreenshotResult {
  base64: string;
  mimeType: "image/png";
  width: number;
  height: number;
}
