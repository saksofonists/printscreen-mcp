import { z } from "zod";
// Input schema
const inputSchema = {
    screenIndex: z
        .number()
        .min(0)
        .default(0)
        .describe("Screen/monitor index (0 = primary)"),
};
export function registerScreenshotScreenTool(server, screenshotService) {
    server.tool("screenshot_screen", "Capture a screenshot of an entire screen. Returns base64 PNG image.", inputSchema, async (args) => {
        try {
            const screenIndex = args.screenIndex ?? 0;
            const result = await screenshotService.captureScreen(screenIndex);
            return {
                content: [
                    {
                        type: "image",
                        data: result.base64,
                        mimeType: result.mimeType,
                    },
                    {
                        type: "text",
                        text: `Screenshot captured: ${result.width}x${result.height} pixels from screen ${screenIndex}`,
                    },
                ],
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return {
                content: [{ type: "text", text: `Error: ${message}` }],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=screenshotScreen.js.map