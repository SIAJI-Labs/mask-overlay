"use client";

/**
 * LayerPanel component for managing multiple watermark layers
 */

import React from "react";
import { Layers, Plus, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { WatermarkLayer } from "@/types/files";
import { MAX_LAYERS } from "@/types/files";

interface LayerPanelProps {
    layers: WatermarkLayer[];
    activeLayerIndex: number;
    onSelectLayer: (index: number) => void;
    onAddLayer: () => void;
    onRemoveLayer: (layerId: string) => void;
}

export function LayerPanel({
    layers,
    activeLayerIndex,
    onSelectLayer,
    onAddLayer,
    onRemoveLayer,
}: LayerPanelProps) {
    const canAddLayer = layers.length < MAX_LAYERS;
    const canRemoveLayer = layers.length > 1;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Layers ({layers.length}/{MAX_LAYERS})
                </Label>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddLayer}
                    disabled={!canAddLayer}
                    title={canAddLayer ? "Add new layer" : `Maximum ${MAX_LAYERS} layers`}
                >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                </Button>
            </div>

            <div className="space-y-2">
                {layers.map((layer, index) => (
                    <div
                        key={layer.id}
                        className={cn(
                            "flex items-center gap-2 p-2 rounded-md border transition-colors cursor-pointer",
                            activeLayerIndex === index
                                ? "bg-primary/10 border-primary"
                                : "bg-muted/30 border-border hover:border-primary/50"
                        )}
                        onClick={() => onSelectLayer(index)}
                    >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Eye className={cn(
                                "h-3.5 w-3.5 flex-shrink-0",
                                activeLayerIndex === index ? "text-primary" : "text-muted-foreground"
                            )} />
                            <div className="flex-1 min-w-0">
                                <div className={cn(
                                    "text-sm font-medium truncate",
                                    activeLayerIndex === index ? "text-primary" : "text-foreground"
                                )}>
                                    {layer.text || `Layer ${index + 1}`}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {layer.mode} • {layer.opacity}% • {layer.fontSize}px
                                </div>
                            </div>
                        </div>
                        {canRemoveLayer && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 flex-shrink-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveLayer(layer.id);
                                }}
                                title="Remove layer"
                            >
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {layers.length > 1 && layers.some(l => l.mode === "diagonal") && (
                <div className="text-xs text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-2">
                    ⚠️ Diagonal mode with multiple layers may overlap. Consider using single mode for better control.
                </div>
            )}
        </div>
    );
}
