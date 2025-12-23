"use client";

import React, { useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileItem, MAX_FILES } from "@/types/files";

interface FileCarouselProps {
    files: FileItem[];
    activeIndex: number;
    onSelect: (index: number) => void;
    onRemove: (id: string) => void;
    onAddMore: () => void;
}

export function FileCarousel({
    files,
    activeIndex,
    onSelect,
    onRemove,
    onAddMore,
}: FileCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const canAddMore = files.length < MAX_FILES;

    // Scroll active item into view
    useEffect(() => {
        const container = scrollRef.current;
        const activeItem = container?.children[activeIndex] as HTMLElement | undefined;
        if (activeItem && container) {
            const containerRect = container.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();

            if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
                activeItem.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    }, [activeIndex]);

    return (
        <div className="w-full bg-background/80 backdrop-blur-sm border-t px-4 py-3">
            <div className="flex items-center justify-center gap-2">
                {/* File thumbnails */}
                <div
                    ref={scrollRef}
                    className="flex items-center justify-center gap-2 flex-wrap"
                >
                    {files.map((fileItem, index) => (
                        <div
                            key={fileItem.id}
                            className="relative flex-shrink-0 group"
                        >
                            <button
                                onClick={() => onSelect(index)}
                                className={cn(
                                    "relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-200",
                                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                    index === activeIndex
                                        ? "border-[3px] border-primary ring-2 ring-primary/40 scale-105"
                                        : "border-2 border-muted-foreground/20 hover:border-muted-foreground/40"
                                )}
                                title={fileItem.file.name}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={fileItem.imageSrc}
                                    alt={fileItem.file.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Index badge */}
                                <span className="absolute bottom-0.5 right-0.5 bg-background/80 text-xs font-medium px-1 rounded">
                                    {index + 1}
                                </span>
                            </button>

                            {/* Remove button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(fileItem.id);
                                }}
                                className={cn(
                                    "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full",
                                    "bg-destructive text-destructive-foreground",
                                    "flex items-center justify-center",
                                    "opacity-0 group-hover:opacity-100 focus:opacity-100",
                                    "transition-opacity duration-150",
                                    "focus:outline-none focus:ring-2 focus:ring-destructive"
                                )}
                                title="Remove file"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add more button with counter */}
                {canAddMore && (
                    <Button
                        variant="outline"
                        onClick={onAddMore}
                        className="flex-shrink-0 w-16 h-16 border-dashed border-2 flex-col gap-0.5"
                        title={`Add more files (${MAX_FILES - files.length} remaining)`}
                    >
                        <Plus className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{files.length}/{MAX_FILES}</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
