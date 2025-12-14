export function registerListWindowsTool(server, windowService) {
    server.tool("list_windows", "List all visible windows with their ID, title, app name, and screen index", {}, async () => {
        try {
            const windows = windowService.getAllWindows();
            const result = {
                windows,
                totalWindows: windows.length,
            };
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result, null, 2),
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
//# sourceMappingURL=listWindows.js.map