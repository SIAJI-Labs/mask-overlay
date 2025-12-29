"use client";

// React
import { useState, useCallback, useRef } from "react";

// Layout
import { MainLayout } from "@/components/layout/MainLayout";

// Features
import { ControlsSidebar } from "@/components/features/ControlsSidebar";
import { FileUpload } from "@/components/features/FileUpload";
import { FileCarousel } from "@/components/features/FileCarousel";
import { CanvasPreview } from "@/components/features/CanvasPreview";
import { OfflineIndicator } from "@/components/features/OfflineIndicator";

// Types
import { FileItem, WatermarkSettings, DEFAULT_SETTINGS, ExportMode } from "@/types/files";

// Utils
import { downloadSingle, downloadBulk, downloadZip, getExportFilename, getCanvasDataUrl, ExportableFile } from "@/lib/exportUtils";
import { renderToCanvas } from "@/lib/renderUtils";

// Hooks
import { useTemplates } from "@/hooks/useTemplates";

// Utility to generate unique IDs
const generateId = () => crypto.randomUUID();

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exportMode, setExportMode] = useState<ExportMode>("single");
  const [isAddingMore, setIsAddingMore] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [templateOriginalSettings, setTemplateOriginalSettings] = useState<WatermarkSettings | null>(null);

  // Template management
  const { templates, saveTemplate, updateTemplate, renameTemplate, deleteTemplate } = useTemplates();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get the currently active file
  const activeFile = files[activeIndex] ?? null;

  // Check if settings have changed from the loaded template
  const templateHasChanges = currentTemplateId && templateOriginalSettings && activeFile
    ? JSON.stringify(activeFile.settings) !== JSON.stringify(templateOriginalSettings)
    : false;

  // Handle initial file selection or adding more files
  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    const newFileItems: FileItem[] = [];

    let loadedCount = 0;
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem: FileItem = {
          id: generateId(),
          file,
          imageSrc: e.target?.result as string,
          settings: { ...DEFAULT_SETTINGS },
        };
        newFileItems.push(newItem);
        loadedCount++;

        // When all files are loaded, update state
        if (loadedCount === selectedFiles.length) {
          setFiles((prev) => {
            const updated = [...prev, ...newFileItems];
            // If this is the first upload, ensure activeIndex is 0
            if (prev.length === 0) {
              setActiveIndex(0);
            }
            return updated;
          });
          setIsAddingMore(false);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  // Handle clicking the add more button in carousel
  const handleAddMore = useCallback(() => {
    setIsAddingMore(true);
  }, []);

  // Handle selecting a file in the carousel
  const handleSelectFile = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Handle removing a file
  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      // Adjust activeIndex if needed
      if (filtered.length === 0) {
        setActiveIndex(0);
      } else if (activeIndex >= filtered.length) {
        setActiveIndex(filtered.length - 1);
      }
      return filtered;
    });
  }, [activeIndex]);

  // Handle resetting everything
  const handleReset = useCallback(() => {
    setFiles([]);
    setActiveIndex(0);
    setExportMode("single");
    setIsAddingMore(false);
  }, []);

  // Handle settings change for the active file
  const handleSettingsChange = useCallback((newSettings: Partial<WatermarkSettings>) => {
    setFiles((prev) =>
      prev.map((f, i) =>
        i === activeIndex
          ? { ...f, settings: { ...f.settings, ...newSettings } }
          : f
      )
    );
  }, [activeIndex]);

  // Handle export mode change
  const handleExportModeChange = useCallback((mode: ExportMode) => {
    setExportMode(mode);
  }, []);

  // Handle loading a template (applies settings to active file)
  const handleLoadTemplate = useCallback((settings: WatermarkSettings, templateId: string) => {
    setFiles((prev) =>
      prev.map((f, i) =>
        i === activeIndex ? { ...f, settings } : f
      )
    );
    setCurrentTemplateId(templateId);
    setTemplateOriginalSettings({ ...settings });
  }, [activeIndex]);

  // Handle saving current settings as a template
  const handleSaveTemplate = useCallback((name: string) => {
    if (activeFile) {
      const newTemplate = saveTemplate(name, activeFile.settings);
      setCurrentTemplateId(newTemplate.id);
      setTemplateOriginalSettings({ ...activeFile.settings });
    }
  }, [activeFile, saveTemplate]);

  // Handle updating a template with current settings
  const handleUpdateTemplate = useCallback((id: string) => {
    if (activeFile) {
      updateTemplate(id, activeFile.settings);
      setTemplateOriginalSettings({ ...activeFile.settings });
    }
  }, [activeFile, updateTemplate]);

  // Handle discarding template changes (revert to original)
  const handleDiscardTemplate = useCallback(() => {
    if (templateOriginalSettings) {
      setFiles((prev) =>
        prev.map((f, i) =>
          i === activeIndex ? { ...f, settings: { ...templateOriginalSettings } } : f
        )
      );
    }
  }, [activeIndex, templateOriginalSettings]);

  // Handle renaming a template
  const handleRenameTemplate = useCallback((id: string, newName: string) => {
    renameTemplate(id, newName);
  }, [renameTemplate]);

  // Handle deleting a template
  const handleDeleteTemplate = useCallback((id: string) => {
    deleteTemplate(id);
    // Clear current template if it was deleted
    if (currentTemplateId === id) {
      setCurrentTemplateId(null);
    }
  }, [deleteTemplate, currentTemplateId]);

  // Handle export based on mode
  const handleExport = useCallback(async () => {
    if (isExporting) return;

    // Single export - use currently visible canvas
    if (exportMode === "single" || files.length === 1) {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
      if (!canvas || !activeFile) return;

      const ext = activeFile.file.name.split(".").pop()?.toLowerCase() === "png" ? "png" : "jpeg";
      const filename = getExportFilename(activeFile.file.name);
      const dataUrl = getCanvasDataUrl(canvas, ext as 'png' | 'jpeg');
      downloadSingle(dataUrl, filename);
      return;
    }

    // Bulk or ZIP export - render all files off-screen
    setIsExporting(true);
    try {
      const exportableFiles: ExportableFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const canvas = await renderToCanvas({
          imageSrc: file.imageSrc,
          settings: file.settings,
        });

        const ext = file.file.name.split(".").pop()?.toLowerCase() === "png" ? "png" : "jpeg";
        exportableFiles.push({
          filename: getExportFilename(file.file.name, i),
          canvas,
          format: ext as 'png' | 'jpeg',
        });
      }

      if (exportMode === "bulk") {
        await downloadBulk(exportableFiles);
      } else if (exportMode === "zip") {
        await downloadZip(exportableFiles);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  }, [exportMode, files, activeFile, isExporting]);

  // Determine what to show
  const showUploadScreen = files.length === 0 || isAddingMore;
  const hasFiles = files.length > 0;

  return (
    <MainLayout
      sidebar={
        hasFiles && !isAddingMore ? (
          <ControlsSidebar
            settings={activeFile?.settings ?? DEFAULT_SETTINGS}
            onSettingsChange={handleSettingsChange}
            onReset={handleReset}
            onExport={handleExport}
            exportMode={exportMode}
            onExportModeChange={handleExportModeChange}
            fileCount={files.length}
            isExporting={isExporting}
            templates={templates}
            currentTemplateId={currentTemplateId}
            templateHasChanges={templateHasChanges}
            onLoadTemplate={handleLoadTemplate}
            onSaveTemplate={handleSaveTemplate}
            onUpdateTemplate={handleUpdateTemplate}
            onDiscardTemplate={handleDiscardTemplate}
            onRenameTemplate={handleRenameTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        ) : null
      }
    >
      {/* Upload screen */}
      {showUploadScreen ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-full">
          <div className="w-full max-w-2xl px-4 animate-in fade-in zoom-in duration-500">
            {!hasFiles && (
              <div className="text-center mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Protect Your Documents</h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Securely add watermarks to your confidential ID documents.
                  100% offline processing, no data leaves your browser.
                </p>
              </div>
            )}
            {isAddingMore && (
              <div className="text-center mb-8 space-y-2">
                <h2 className="text-2xl font-semibold">Add More Files</h2>
                <button
                  onClick={() => setIsAddingMore(false)}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Cancel and go back
                </button>
              </div>
            )}
            <FileUpload
              onFilesSelect={handleFilesSelect}
              currentFileCount={files.length}
            />
          </div>
        </div>
      ) : (
        <>
          {activeFile && <CanvasPreview imageSrc={activeFile.imageSrc} settings={activeFile.settings} />}
          {/* File carousel - shown at bottom when files exist */}
          {hasFiles && (
            <FileCarousel
              files={files}
              activeIndex={activeIndex}
              onSelect={handleSelectFile}
              onRemove={handleRemoveFile}
              onAddMore={handleAddMore}
            />
          )}
        </>
      )}

      {/* Hidden file input for add more (triggered by carousel) */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            handleFilesSelect(Array.from(e.target.files));
          }
        }}
      />

      <OfflineIndicator />
    </MainLayout>
  );
}
