"use client";

import { useState, useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ControlsSidebar } from "@/components/features/ControlsSidebar";
import { FileUpload } from "@/components/features/FileUpload";
import { CanvasPreview, WatermarkSettings } from "@/components/features/CanvasPreview";
import { OfflineIndicator } from "@/components/features/OfflineIndicator";

const DEFAULT_SETTINGS: WatermarkSettings = {
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

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [settings, setSettings] = useState<WatermarkSettings>(DEFAULT_SETTINGS);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    // Convert File to data URL for canvas
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setImageSrc(null);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const handleSettingsChange = useCallback((newSettings: Partial<WatermarkSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const handleExport = useCallback(() => {
    // Get the canvas element from the CanvasPreview
    const canvas = document.querySelector("canvas");
    if (!canvas || !file) return;

    const link = document.createElement("a");
    const ext = file.name.split(".").pop()?.toLowerCase() === "png" ? "png" : "jpeg";
    link.download = `watermarked-${file.name.replace(/\.[^/.]+$/, "")}.${ext}`;
    link.href = canvas.toDataURL(`image/${ext}`, 0.95);
    link.click();
  }, [file]);

  return (
    <MainLayout
      sidebar={
        file ? (
          <ControlsSidebar
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onReset={handleReset}
            onExport={handleExport}
          />
        ) : null
      }
    >
      {!file || !imageSrc ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-full">
          <div className="w-full max-w-2xl px-4 animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Protect Your Documents</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Securely add watermarks to your confidential ID documents.
                100% offline processing, no data leaves your browser.
              </p>
            </div>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        </div>
      ) : (
        <CanvasPreview imageSrc={imageSrc} settings={settings} />
      )}
      <OfflineIndicator />
    </MainLayout>
  );
}
