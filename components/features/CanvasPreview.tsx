"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Hand, RotateCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export interface WatermarkSettings {
    text: string;
    fontSize: number;
    opacity: number;
    angle: number;
    color: string;
    mode: "single" | "diagonal";
    gap: number;
    offsetX: number; // -50 to 50 percent offset
    offsetY: number; // -50 to 50 percent offset
}

interface CanvasPreviewProps {
    imageSrc: string;
    settings: WatermarkSettings;
}

export function CanvasPreview({ imageSrc, settings }: CanvasPreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [imageRotation, setImageRotation] = useState(0); // 0, 90, 180, 270
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });

    // Load image once
    useEffect(() => {
        setIsLoading(true);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            setOriginalImage(img);
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
        };
        img.src = imageSrc;
    }, [imageSrc]);

    // Calculate dimensions when image, scale, or rotation changes
    useEffect(() => {
        if (!originalImage || !containerRef.current) return;

        const container = containerRef.current;
        const containerWidth = container.clientWidth - 32;
        const containerHeight = container.clientHeight - 32;

        // Swap dimensions if rotated 90 or 270 degrees
        const isRotated90 = imageRotation === 90 || imageRotation === 270;
        const imgWidth = isRotated90 ? originalImage.height : originalImage.width;
        const imgHeight = isRotated90 ? originalImage.width : originalImage.height;

        const imgRatio = imgWidth / imgHeight;
        const containerRatio = containerWidth / containerHeight;

        let baseWidth: number;
        let baseHeight: number;

        if (imgRatio > containerRatio) {
            baseWidth = containerWidth;
            baseHeight = containerWidth / imgRatio;
        } else {
            baseHeight = containerHeight;
            baseWidth = containerHeight * imgRatio;
        }

        setDimensions({
            width: baseWidth * scale,
            height: baseHeight * scale,
        });
    }, [originalImage, scale, imageRotation]);

    // Render canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !originalImage || dimensions.width === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Swap canvas dimensions if rotated 90 or 270 degrees
        const isRotated90 = imageRotation === 90 || imageRotation === 270;
        const canvasWidth = isRotated90 ? originalImage.height : originalImage.width;
        const canvasHeight = isRotated90 ? originalImage.width : originalImage.height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply image rotation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((imageRotation * Math.PI) / 180);
        ctx.drawImage(
            originalImage,
            -originalImage.width / 2,
            -originalImage.height / 2,
            originalImage.width,
            originalImage.height
        );
        ctx.restore();

        // Draw watermark
        if (settings.text.trim()) {
            ctx.save();
            ctx.globalAlpha = settings.opacity / 100;
            ctx.fillStyle = settings.color;

            const scaledFontSize = settings.fontSize * (canvasWidth / 800);
            ctx.font = `bold ${scaledFontSize}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (settings.mode === "single") {
                // Apply offset as percentage of canvas dimensions
                const offsetX = (settings.offsetX / 100) * canvas.width;
                const offsetY = (settings.offsetY / 100) * canvas.height;

                ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
                ctx.rotate((settings.angle * Math.PI) / 180);
                ctx.fillText(settings.text, 0, 0);
            } else {
                const textWidth = ctx.measureText(settings.text).width;
                const baseGap = textWidth * settings.gap;
                const rowGap = scaledFontSize * settings.gap * 1.5;
                const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
                const rows = Math.ceil(diagonal / rowGap) + 2;
                const cols = Math.ceil(diagonal / baseGap) + 2;



                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((settings.angle * Math.PI) / 180);

                for (let row = -rows; row <= rows; row++) {
                    for (let col = -cols; col <= cols; col++) {
                        ctx.fillText(settings.text, col * baseGap, row * rowGap);
                    }
                }
            }

            ctx.restore();
        }
    }, [originalImage, settings, dimensions, imageRotation]);

    // Pan handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
        setScrollStart({
            x: scrollContainerRef.current.scrollLeft,
            y: scrollContainerRef.current.scrollTop,
        });
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isPanning || !scrollContainerRef.current) return;
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;
        scrollContainerRef.current.scrollLeft = scrollStart.x - dx;
        scrollContainerRef.current.scrollTop = scrollStart.y - dy;
    }, [isPanning, panStart, scrollStart]);

    const handleMouseUp = useCallback(() => {
        setIsPanning(false);
    }, []);

    // Zoom handlers
    const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
    const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
    const handleResetZoom = () => setScale(1);

    // Image rotation handlers (rotate the actual image)
    const handleRotateLeft = () => {
        setImageRotation((r) => (r - 90 + 360) % 360);
    };
    const handleRotateRight = () => {
        setImageRotation((r) => (r + 90) % 360);
    };

    // Keyboard shortcuts
    useKeyboardShortcuts({
        onZoomIn: handleZoomIn,
        onZoomOut: handleZoomOut,
        onRotateLeft: handleRotateLeft,
        onRotateRight: handleRotateRight,
        enabled: !isLoading,
    });

    return (
        <div
            ref={containerRef}
            className="flex-1 flex flex-col bg-muted/20 overflow-hidden"
        >
            {/* Toolbar */}
            <div className="flex items-center justify-center gap-1 p-2 border-b bg-background/50 backdrop-blur">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 px-2 border-r">
                    <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={scale <= 0.5}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium w-12 text-center tabular-nums">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={scale >= 3}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetZoom} disabled={scale === 1}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                {/* Image Rotate Controls */}
                <div className="flex items-center gap-1 px-2 border-r">
                    <Button variant="ghost" size="sm" onClick={handleRotateLeft} title="Rotate Left 90°">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium w-10 text-center tabular-nums">
                        {imageRotation}°
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleRotateRight} title="Rotate Right 90°">
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>

                {/* Pan indicator */}
                <div className="flex items-center gap-1 px-2">
                    <Hand className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground hidden sm:inline">Drag to pan</span>
                </div>
            </div>

            {/* Canvas Container with pan support */}
            <div
                ref={scrollContainerRef}
                className={cn(
                    "flex-1 overflow-auto",
                    isPanning ? "cursor-grabbing" : "cursor-grab"
                )}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                role="img"
                aria-label="Watermarked image preview"
            >
                {/* Loading State */}
                {isLoading && (
                    <div className="flex-1 min-h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span className="text-sm">Loading image...</span>
                        </div>
                    </div>
                )}

                {/* Inner wrapper to enable proper centering and scrolling */}
                {!isLoading && (
                    <div
                        className="min-w-full min-h-full flex items-center justify-center p-8"
                        style={{
                            minWidth: dimensions.width + 64,
                            minHeight: dimensions.height + 64,
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            className="shadow-lg rounded-lg bg-white pointer-events-none flex-shrink-0"
                            style={{
                                width: dimensions.width || "auto",
                                height: dimensions.height || "auto",
                            }}
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
