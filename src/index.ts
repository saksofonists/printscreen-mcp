import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { WindowService } from "./services/windowService.js";
import { ScreenshotService } from "./services/screenshotService.js";
import { registerListWindowsTool } from "./tools/listWindows.js";
import { registerScreenshotWindowTool } from "./tools/screenshotWindow.js";
import { registerScreenshotScreenTool } from "./tools/screenshotScreen.js";

async function main(): Promise<void> {
  // Initialize services
  const windowService = new WindowService();
  const screenshotService = new ScreenshotService(windowService);

  // Create MCP server
  const server = new McpServer({
    name: "prtscr-mcp",
    version: "1.0.0",
  });

  // Register tools
  registerListWindowsTool(server, windowService);
  registerScreenshotWindowTool(server, screenshotService);
  registerScreenshotScreenTool(server, screenshotService);

  // Connect via stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr (stdout is used for MCP protocol)
  console.error("prtscr-mcp server started");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
