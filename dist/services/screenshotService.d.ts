import type { ScreenshotResult } from "../types/index.js";
import { WindowService } from "./windowService.js";
export declare class ScreenshotService {
    private windowService;
    constructor(windowService: WindowService);
    /**
     * Convert captured image to base64 PNG
     */
    private imageToBase64;
    /**
     * Capture screenshot of a window by ID
     */
    captureWindowById(windowId: number): Promise<ScreenshotResult>;
    /**
     * Capture screenshot of a window by title (first match)
     */
    captureWindowByTitle(title: string): Promise<ScreenshotResult>;
    /**
     * Capture entire screen by index
     */
    captureScreen(screenIndex: number): Promise<ScreenshotResult>;
}
//# sourceMappingURL=screenshotService.d.ts.map