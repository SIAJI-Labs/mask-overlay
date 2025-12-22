"use client";

import React, { useCallback, useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        // Check type
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
            setError("Only PNG and JPG files are supported");
            return false;
        }

        // Check size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB");
            return false;
        }

        setError(null);
        return true;
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragOver(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                if (validateFile(file)) {
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (validateFile(file)) {
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect]
    );

    return (
        <div className="w-full max-w-xl mx-auto p-6">
            <Card
                className={cn(
                    "relative border-2 border-dashed transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:bg-muted/50",
                    isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                    error ? "border-destructive/50 bg-destructive/5" : ""
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileInput}
                />

                <div className="rounded-full bg-muted/50 p-4 mb-4 transition-colors group-hover:bg-primary/10">
                    <Upload
                        className={cn(
                            "h-8 w-8 text-muted-foreground transition-colors",
                            isDragOver ? "text-primary" : "group-hover:text-primary"
                        )}
                    />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                    {isDragOver ? "Drop image here" : "Upload an image"}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                    Drag and drop your document here, or click to browse files
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground/75 bg-muted/30 px-3 py-1.5 rounded-full">
                    <span>PNG, JPG</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>Max 10MB</span>
                </div>

                {error && (
                    <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit flex items-center gap-2 text-destructive text-sm font-medium bg-background/80 px-3 py-1 rounded-md shadow-sm border border-destructive/20 animate-in fade-in slide-in-from-bottom-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </Card>
        </div>
    );
}
