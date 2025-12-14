import { Window, Monitor } from "node-screenshots";
export class WindowService {
    /**
     * Get all visible windows with their properties
     */
    getAllWindows() {
        const windows = Window.all();
        const monitors = Monitor.all();
        // Create monitor index lookup by ID
        const monitorIndexMap = new Map();
        monitors.forEach((monitor, index) => {
            monitorIndexMap.set(monitor.id, index);
        });
        return windows
            .filter((win) => {
            // Filter out windows with empty titles (system windows)
            const title = win.title;
            return title && title.trim().length > 0;
        })
            .map((win) => {
            const currentMonitor = win.currentMonitor;
            const screenIndex = monitorIndexMap.get(currentMonitor.id) ?? 0;
            return {
                id: win.id,
                title: win.title,
                appName: win.appName,
                screen: screenIndex,
            };
        });
    }
    /**
     * Find a window by ID
     */
    findWindowById(id) {
        const windows = Window.all();
        return windows.find((win) => win.id === id) ?? null;
    }
    /**
     * Find windows by title (partial match, case-insensitive)
     */
    findWindowsByTitle(title) {
        const windows = Window.all();
        const lowerTitle = title.toLowerCase();
        return windows.filter((win) => win.title.toLowerCase().includes(lowerTitle));
    }
    /**
     * Get monitor by index
     */
    getScreenByIndex(index) {
        const monitors = Monitor.all();
        return monitors[index] ?? null;
    }
    /**
     * Get total number of screens
     */
    getScreenCount() {
        return Monitor.all().length;
    }
}
//# sourceMappingURL=windowService.js.map