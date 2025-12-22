"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ControlsSidebar } from "@/components/features/ControlsSidebar";
import { FileUpload } from "@/components/features/FileUpload";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
  };

  return (
    <MainLayout sidebar={file ? <ControlsSidebar /> : null}>
      {!file ? (
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
        <div className="flex-1 flex items-center justify-center p-4 h-full animate-in fade-in duration-300">
          <div className="text-center p-12 border-2 border-dashed rounded-xl border-muted-foreground/20 bg-muted/10 max-w-md w-full">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="font-semibold text-lg mb-1">File Loaded</h3>
            <p className="font-medium mb-6 text-primary break-all">{file.name}</p>
            <p className="text-sm text-muted-foreground mb-8">Canvas Preview & Controls Coming in Phase 3</p>
            <Button
              variant="destructive"
              onClick={handleReset}
            >
              Reset & Upload New
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
