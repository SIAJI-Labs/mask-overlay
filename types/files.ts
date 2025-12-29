// Watermark settings for a single layer
export interface WatermarkLayer {
    id: string;
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

// Represents a single file with multiple layers
export interface FileItem {
    id: string;
    file: File;
    imageSrc: string;
    layers: WatermarkLayer[];
    activeLayerIndex: number;
}

// Export mode options
export type ExportMode = "single" | "bulk" | "zip";

// Default watermark layer
export const DEFAULT_LAYER: Omit<WatermarkLayer, "id"> = {
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

// Helper to create a new layer with unique ID
export const createLayer = (overrides?: Partial<Omit<WatermarkLayer, "id">>): WatermarkLayer => ({
    id: crypto.randomUUID(),
    ...DEFAULT_LAYER,
    ...overrides,
});

// Maximum number of files allowed
export const MAX_FILES = 5;

// Maximum number of layers per file
export const MAX_LAYERS = 5;
