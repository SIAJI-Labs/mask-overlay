"use client";

import React from "react";
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
import type { WatermarkSettings } from "./CanvasPreview";

interface ControlsSidebarProps {
    settings: WatermarkSettings;
    onSettingsChange: (settings: Partial<WatermarkSettings>) => void;
    onReset: () => void;
    onExport: () => void;
}

const PRESETS = [
    { label: "CONFIDENTIAL", value: "CONFIDENTIAL" },
    { label: "FOR VERIFICATION ONLY", value: "FOR VERIFICATION ONLY" },
    { label: "SAMPLE", value: "SAMPLE" },
    { label: "DRAFT", value: "DRAFT" },
];

const COLOR_PRESETS = [
    { label: "Black", value: "#000000" },
    { label: "White", value: "#FFFFFF" },
    { label: "Red", value: "#DC2626" },
];

export function ControlsSidebar({
    settings,
    onSettingsChange,
    onReset,
    onExport,
}: ControlsSidebarProps) {
    return (
        <aside className="w-full h-full bg-background flex flex-col">
            <div className="flex items-center gap-2 p-2 border-b bg-background/50 backdrop-blur min-h-[49px]">
                <h2 className="font-semibold text-sm px-2">Controls</h2>
                <span className="text-xs text-muted-foreground">• Customize watermark</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Quick Presets */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Quick Presets</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {PRESETS.map((preset) => (
                            <Button
                                key={preset.value}
                                variant={settings.text === preset.value ? "default" : "outline"}
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => onSettingsChange({ text: preset.value })}
                            >
                                {preset.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Text Input */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="watermark-text" className="text-sm font-medium">
                            Watermark Text
                        </Label>
                        <span className="text-xs text-muted-foreground">
                            {settings.text.length}/50
                        </span>
                    </div>
                    <Input
                        id="watermark-text"
                        value={settings.text}
                        onChange={(e) =>
                            onSettingsChange({ text: e.target.value.slice(0, 50) })
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
                            variant={settings.mode === "single" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSettingsChange({ mode: "single" })}
                        >
                            Single
                        </Button>
                        <Button
                            variant={settings.mode === "diagonal" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSettingsChange({ mode: "diagonal" })}
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
                            {settings.fontSize}px
                        </span>
                    </div>
                    <Slider
                        value={[settings.fontSize]}
                        onValueChange={([value]) => onSettingsChange({ fontSize: value })}
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
                            {settings.opacity}%
                        </span>
                    </div>
                    <Slider
                        value={[settings.opacity]}
                        onValueChange={([value]) => onSettingsChange({ opacity: value })}
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
                            {settings.angle}°
                        </span>
                    </div>
                    <Slider
                        value={[settings.angle]}
                        onValueChange={([value]) => onSettingsChange({ angle: value })}
                        min={-45}
                        max={45}
                        step={1}
                    />
                </div>

                {/* Gap (only for diagonal mode) */}
                {settings.mode === "diagonal" && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium">Text Gap</Label>
                            <span className="text-xs text-muted-foreground tabular-nums">
                                {settings.gap.toFixed(1)}x
                            </span>
                        </div>
                        <Slider
                            value={[settings.gap]}
                            onValueChange={([value]) => onSettingsChange({ gap: value })}
                            min={1}
                            max={3}
                            step={0.1}
                        />
                    </div>
                )}

                {/* Offset X/Y (only for single mode) */}
                {settings.mode === "single" && (
                    <>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Offset X</Label>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {settings.offsetX}%
                                </span>
                            </div>
                            <Slider
                                value={[settings.offsetX]}
                                onValueChange={([value]) => onSettingsChange({ offsetX: value })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Offset Y</Label>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {settings.offsetY}%
                                </span>
                            </div>
                            <Slider
                                value={[settings.offsetY]}
                                onValueChange={([value]) => onSettingsChange({ offsetY: value })}
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
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${settings.color === color.value
                                    ? "border-primary ring-2 ring-primary/30"
                                    : "border-muted-foreground/30"
                                    }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => onSettingsChange({ color: color.value })}
                                title={color.label}
                            />
                        ))}
                        <input
                            type="color"
                            value={settings.color}
                            onChange={(e) => onSettingsChange({ color: e.target.value })}
                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-muted-foreground/30"
                            title="Custom color"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t bg-muted/10 space-y-2">
                <Button className="w-full" onClick={onExport} aria-label="Export watermarked image">
                    Export Image
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
                                This will clear the current image and reset all watermark settings to defaults. You&apos;ll need to upload a new image.
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
