# printscreen-mcp

MCP server for taking screenshots on Windows.

## Tools

| Tool | Description |
|------|-------------|
| `list_windows` | List visible windows (id, title, appName, screen) |
| `screenshot_window` | Capture window by ID or title |
| `screenshot_screen` | Capture entire screen by index |

## Install

### Claude Code

```bash
claude mcp add printscreen-mcp -- npx -y github:saksofonists/printscreen-mcp
```

### Claude Desktop

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "prtscr": {
      "command": "npx",
      "args": ["-y", "github:saksofonists/printscreen-mcp"]
    }
  }
}
```

## Build from Source

```bash
git clone https://github.com/saksofonists/printscreen-mcp
cd printscreen-mcp
npm install
npm run build
```
