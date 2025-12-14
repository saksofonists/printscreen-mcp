import { Window, Monitor } from "node-screenshots";
import type { WindowInfo } from "../types/index.js";
export declare class WindowService {
    /**
     * Get all visible windows with their properties
     */
    getAllWindows(): WindowInfo[];
    /**
     * Find a window by ID
     */
    findWindowById(id: number): Window | null;
    /**
     * Find windows by title (partial match, case-insensitive)
     */
    findWindowsByTitle(title: string): Window[];
    /**
     * Get monitor by index
     */
    getScreenByIndex(index: number): Monitor | null;
    /**
     * Get total number of screens
     */
    getScreenCount(): number;
}
//# sourceMappingURL=windowService.d.ts.map