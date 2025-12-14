import { Window, Monitor } from "node-screenshots";
import type { WindowInfo } from "../types/index.js";

export class WindowService {
  /**
   * Get all visible windows with their properties
   */
  getAllWindows(): WindowInfo[] {
    const windows = Window.all();
    const monitors = Monitor.all();

    // Create monitor index lookup by ID
    const monitorIndexMap = new Map<number, number>();
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
  findWindowById(id: number): Window | null {
    const windows = Window.all();
    return windows.find((win) => win.id === id) ?? null;
  }

  /**
   * Find windows by title (partial match, case-insensitive)
   */
  findWindowsByTitle(title: string): Window[] {
    const windows = Window.all();
    const lowerTitle = title.toLowerCase();
    return windows.filter((win) =>
      win.title.toLowerCase().includes(lowerTitle)
    );
  }

  /**
   * Get monitor by index
   */
  getScreenByIndex(index: number): Monitor | null {
    const monitors = Monitor.all();
    return monitors[index] ?? null;
  }

  /**
   * Get total number of screens
   */
  getScreenCount(): number {
    return Monitor.all().length;
  }
}
