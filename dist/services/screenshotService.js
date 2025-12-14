export class ScreenshotService {
    windowService;
    constructor(windowService) {
        this.windowService = windowService;
    }
    /**
     * Convert captured image to base64 PNG
     */
    async imageToBase64(image) {
        const pngBuffer = await image.toPng();
        return {
            base64: pngBuffer.toString("base64"),
            mimeType: "image/png",
            width: image.width,
            height: image.height,
        };
    }
    /**
     * Capture screenshot of a window by ID
     */
    async captureWindowById(windowId) {
        const window = this.windowService.findWindowById(windowId);
        if (!window) {
            throw new Error(`Window with ID ${windowId} not found`);
        }
        if (window.isMinimized) {
            throw new Error(`Window "${window.title}" is minimized and cannot be captured`);
        }
        const image = await window.captureImage();
        return this.imageToBase64(image);
    }
    /**
     * Capture screenshot of a window by title (first match)
     */
    async captureWindowByTitle(title) {
        const windows = this.windowService.findWindowsByTitle(title);
        if (windows.length === 0) {
            throw new Error(`No window found matching title "${title}"`);
        }
        // Find first non-minimized window
        const window = windows.find((w) => !w.isMinimized);
        if (!window) {
            throw new Error(`All windows matching "${title}" are minimized`);
        }
        const image = await window.captureImage();
        return this.imageToBase64(image);
    }
    /**
     * Capture entire screen by index
     */
    async captureScreen(screenIndex) {
        const monitor = this.windowService.getScreenByIndex(screenIndex);
        if (!monitor) {
            const screenCount = this.windowService.getScreenCount();
            throw new Error(`Screen index ${screenIndex} not found. Available screens: 0-${screenCount - 1}`);
        }
        const image = await monitor.captureImage();
        return this.imageToBase64(image);
    }
}
//# sourceMappingURL=screenshotService.js.map