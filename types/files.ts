// Watermark settings for a single layer
export interface WatermarkSettings {
    text: string;
    fontSize: number;
    opacity: number;
    angle: number;
    color: string;
    mode: "single" | "diagonal";
    gap: number;
    offsetX: number;
    offsetY: number;
}

// Represents a single file with its own settings
export interface FileItem {
    id: string;
    file: File;
    imageSrc: string;
    settings: WatermarkSettings;
}

// Export mode options
export type ExportMode = "single" | "bulk" | "zip";

// Default watermark settings
export const DEFAULT_SETTINGS: WatermarkSettings = {
    text: "CONFIDENTIAL",
    fontSize: 32,
    opacity: 50,
    angle: -30,
    color: "#000000",
    mode: "diagonal",
    gap: 1.5,
    offsetX: 0,
    offsetY: 0,
};

// Maximum number of files allowed
export const MAX_FILES = 5;
