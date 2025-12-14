# prtscr-mcp

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
claude mcp add prtscr-mcp -- npx -y github:saksofonists/prtscr-mcp
```

### Claude Desktop

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "prtscr": {
      "command": "npx",
      "args": ["-y", "github:saksofonists/prtscr-mcp"]
    }
  }
}
```

## Build from Source

```bash
git clone https://github.com/saksofonists/prtscr-mcp
cd prtscr-mcp
npm install
npm run build
```
