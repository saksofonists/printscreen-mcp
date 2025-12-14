import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WindowService } from "../services/windowService.js";

export function registerListWindowsTool(
  server: McpServer,
  windowService: WindowService
): void {
  server.tool(
    "list_windows",
    "List all visible windows with their ID, title, app name, and screen index",
    {},
    async () => {
      try {
        const windows = windowService.getAllWindows();

        const result = {
          windows,
          totalWindows: windows.length,
        };

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
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
