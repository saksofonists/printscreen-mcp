import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ScreenshotService } from "../services/screenshotService.js";

// Input schema - either windowId OR title required
const inputSchema = {
  windowId: z
    .number()
    .optional()
    .describe("Window ID from list_windows result"),
  title: z
    .string()
    .optional()
    .describe("Window title (partial match, case-insensitive)"),
};

export function registerScreenshotWindowTool(
  server: McpServer,
  screenshotService: ScreenshotService
): void {
  server.tool(
    "screenshot_window",
    "Capture a screenshot of a specific window by ID or title. Returns base64 PNG image.",
    inputSchema,
    async (args) => {
      try {
        // Validate that at least one identifier is provided
        if (args.windowId === undefined && !args.title) {
          throw new Error("Either windowId or title must be provided");
        }

        let result;

        if (args.windowId !== undefined) {
          result = await screenshotService.captureWindowById(args.windowId);
        } else if (args.title) {
          result = await screenshotService.captureWindowByTitle(args.title);
        } else {
          throw new Error("Either windowId or title must be provided");
        }

        return {
          content: [
            {
              type: "image" as const,
              data: result.base64,
              mimeType: result.mimeType,
            },
            {
              type: "text" as const,
              text: `Screenshot captured: ${result.width}x${result.height} pixels`,
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: "text" as const, text: `Error: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
