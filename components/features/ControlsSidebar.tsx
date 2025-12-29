"use client";

// React
import React, { useRef } from "react";

// Icons
import { Palette, Download, FileArchive, Files, Loader2 } from "lucide-react";

// Shadcn/UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Types
import type { WatermarkLayer, ExportMode } from "@/types/files";
import type { Template } from "@/types/templates";
import { TemplateManager } from "./TemplateManager";
import { LayerPanel } from "./LayerPanel";

interface ControlsSidebarProps {
    layer: WatermarkLayer;
    onLayerChange: (layer: Partial<Omit<WatermarkLayer, "id">>) => void;
    layers: WatermarkLayer[];
    activeLayerIndex: number;
    onAddLayer: () => void;
    onRemoveLayer: (layerId: string) => void;
    onSelectLayer: (layerIndex: number) => void;
    onReset: () => void;
    onExport: () => void;
    exportMode?: ExportMode;
    onExportModeChange?: (mode: ExportMode) => void;
    fileCount?: number;
    isExporting?: boolean;
    templates?: Template[];
    currentTemplateId?: string | null;
    templateHasChanges?: boolean;
    onLoadTemplate?: (layer: WatermarkLayer, templateId: string) => void;
    onSaveTemplate?: (name: string) => void;
    onUpdateTemplate?: (id: string) => void;
    onDiscardTemplate?: () => void;
    onRenameTemplate?: (id: string, newName: string) => void;
    onDeleteTemplate?: (id: string) => void;
}

const COLOR_PRESETS = [
    { label: "Black", value: "#000000" },
    { label: "White", value: "#FFFFFF" },
    { label: "Red", value: "#DC2626" },
];

// Custom color picker button component
function ColorPickerButton({ value, onChange }: { value: string; onChange: (color: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative">
            <button
                type="button"
                className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center hover:border-primary transition-colors"
                onClick={() => inputRef.current?.click()}
                title="Custom color"
                aria-label="Pick custom color"
            >
                <Palette className="h-4 w-4 text-muted-foreground" />
            </button>
            <input
                ref={inputRef}
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                tabIndex={-1}
            />
        </div>
    );
}

export function ControlsSidebar({
    layer,
    onLayerChange,
    layers,
    activeLayerIndex,
    onAddLayer,
    onRemoveLayer,
    onSelectLayer,
    onReset,
    onExport,
    exportMode = "single",
    onExportModeChange,
    fileCount = 1,
    isExporting = false,
    templates = [],
    currentTemplateId,
    templateHasChanges,
    onLoadTemplate,
    onSaveTemplate,
    onUpdateTemplate,
    onDiscardTemplate,
    onRenameTemplate,
    onDeleteTemplate,
}: ControlsSidebarProps) {
    return (
        <aside className="w-full h-full bg-background flex flex-col">
            <div className="flex items-center gap-2 p-2 border-b bg-background/50 backdrop-blur min-h-[49px]">
                <h2 className="font-semibold text-sm px-2">Controls</h2>
                <span className="text-xs text-muted-foreground">• Customize watermark</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Templates */}
                {onLoadTemplate && onSaveTemplate && onUpdateTemplate && onDiscardTemplate && onRenameTemplate && onDeleteTemplate && (
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Templates</Label>
                        <TemplateManager
                            templates={templates}
                            currentTemplateId={currentTemplateId}
                            hasChanges={templateHasChanges}
                            onLoad={onLoadTemplate}
                            onSave={onSaveTemplate}
                            onUpdate={onUpdateTemplate}
                            onDiscard={onDiscardTemplate}
                            onRename={onRenameTemplate}
                            onDelete={onDeleteTemplate}
                        />
                    </div>
                )}

                <Separator />

                {/* Layer Panel */}
                <LayerPanel
                    layers={layers}
                    activeLayerIndex={activeLayerIndex}
                    onSelectLayer={onSelectLayer}
                    onAddLayer={onAddLayer}
                    onRemoveLayer={onRemoveLayer}
                />

                <Separator />

                {/* Text Input */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="watermark-text" className="text-sm font-medium">
                            Watermark Text
                        </Label>
                        <span className="text-xs text-muted-foreground">
                            {layer.text.length}/50
                        </span>
                    </div>
                    <Input
                        id="watermark-text"
                        value={layer.text}
                        onChange={(e) =>
                            onLayerChange({ text: e.target.value.slice(0, 50) })
                        }
                        placeholder="Enter watermark text..."
                        maxLength={50}
                    />
                </div>

                <Separator />

                {/* Pattern Mode */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Pattern Mode</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant={layer.mode === "single" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onLayerChange({ mode: "single" })}
                        >
                            Single
                        </Button>
                        <Button
                            variant={layer.mode === "diagonal" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onLayerChange({ mode: "diagonal" })}
                        >
                            Diagonal Repeat
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Font Size */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Font Size</Label>
                        <span className="text-xs text-muted-foreground tabular-nums">
                            {layer.fontSize}px
                        </span>
                    </div>
                    <Slider
                        value={[layer.fontSize]}
                        onValueChange={([value]) => onLayerChange({ fontSize: value })}
                        min={12}
                        max={72}
                        step={1}
                    />
                </div>

                {/* Opacity */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Opacity</Label>
                        <span className="text-xs text-muted-foreground tabular-nums">
                            {layer.opacity}%
                        </span>
                    </div>
                    <Slider
                        value={[layer.opacity]}
                        onValueChange={([value]) => onLayerChange({ opacity: value })}
                        min={0}
                        max={100}
                        step={1}
                    />
                </div>

                {/* Angle */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Angle</Label>
                        <span className="text-xs text-muted-foreground tabular-nums">
                            {layer.angle}°
                        </span>
                    </div>
                    <Slider
                        value={[layer.angle]}
                        onValueChange={([value]) => onLayerChange({ angle: value })}
                        min={-45}
                        max={45}
                        step={1}
                    />
                </div>

                {/* Gap (only for diagonal mode) */}
                {layer.mode === "diagonal" && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium">Text Gap</Label>
                            <span className="text-xs text-muted-foreground tabular-nums">
                                {layer.gap.toFixed(1)}x
                            </span>
                        </div>
                        <Slider
                            value={[layer.gap]}
                            onValueChange={([value]) => onLayerChange({ gap: value })}
                            min={1}
                            max={3}
                            step={0.1}
                        />
                    </div>
                )}

                {/* Offset X/Y (only for single mode) */}
                {layer.mode === "single" && (
                    <>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Offset X</Label>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {layer.offsetX}%
                                </span>
                            </div>
                            <Slider
                                value={[layer.offsetX]}
                                onValueChange={([value]) => onLayerChange({ offsetX: value })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Offset Y</Label>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {layer.offsetY}%
                                </span>
                            </div>
                            <Slider
                                value={[layer.offsetY]}
                                onValueChange={([value]) => onLayerChange({ offsetY: value })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </div>
                    </>
                )}

                <Separator />

                {/* Color */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Color</Label>
                    <div className="flex gap-2 items-center">
                        {COLOR_PRESETS.map((color) => (
                            <button
                                key={color.value}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${layer.color === color.value
                                    ? "border-primary ring-2 ring-primary/30"
                                    : "border-muted-foreground/30"
                                    }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => onLayerChange({ color: color.value })}
                                title={color.label}
                            />
                        ))}
                        <ColorPickerButton
                            value={layer.color}
                            onChange={(color) => onLayerChange({ color })}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t bg-muted/10 space-y-3">
                {/* Export Mode Selection (only show for multiple files) */}
                {fileCount > 1 && onExportModeChange && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Export Mode</Label>
                        <div className="grid grid-cols-3 gap-1">
                            <Button
                                variant={exportMode === "single" ? "default" : "outline"}
                                size="sm"
                                className="text-xs h-8 px-2"
                                onClick={() => onExportModeChange("single")}
                                title="Export current image only"
                            >
                                <Download className="w-3 h-3 mr-1" />
                                Current
                            </Button>
                            <Button
                                variant={exportMode === "bulk" ? "default" : "outline"}
                                size="sm"
                                className="text-xs h-8 px-2"
                                onClick={() => onExportModeChange("bulk")}
                                title="Download all files separately"
                            >
                                <Files className="w-3 h-3 mr-1" />
                                All ({fileCount})
                            </Button>
                            <Button
                                variant={exportMode === "zip" ? "default" : "outline"}
                                size="sm"
                                className="text-xs h-8 px-2"
                                onClick={() => onExportModeChange("zip")}
                                title="Download all as ZIP archive"
                            >
                                <FileArchive className="w-3 h-3 mr-1" />
                                ZIP
                            </Button>
                        </div>
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={onExport}
                    disabled={isExporting}
                    aria-label="Export watermarked image"
                >
                    {isExporting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Exporting...
                        </>
                    ) : (
                        exportMode === "single" || fileCount === 1
                            ? "Export Image"
                            : exportMode === "bulk"
                                ? `Export All (${fileCount})`
                                : "Export as ZIP"
                    )}
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full" aria-label="Reset and upload new image">
                            Reset
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Reset everything?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will clear {fileCount > 1 ? `all ${fileCount} images` : "the current image"} and reset all watermark settings to defaults. You&apos;ll need to upload new images.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onReset}>Reset</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </aside>
    );
}
