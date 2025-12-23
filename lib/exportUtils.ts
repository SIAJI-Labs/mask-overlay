/**
 * Export utilities for watermarked images
 * Supports single export, bulk download, and ZIP archive
 */

import JSZip from 'jszip';

export interface ExportableFile {
    filename: string;
    canvas: HTMLCanvasElement;
    format: 'png' | 'jpeg';
}

/**
 * Get the canvas element and prepare export data for a single file
 */
export function getCanvasDataUrl(canvas: HTMLCanvasElement, format: 'png' | 'jpeg', quality = 0.95): string {
    return canvas.toDataURL(`image/${format}`, quality);
}

/**
 * Trigger download of a single file
 */
export function downloadSingle(
    dataUrl: string,
    filename: string
): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
}

/**
 * Download multiple files sequentially
 * Each download is triggered with a small delay to avoid browser blocking
 */
export async function downloadBulk(
    files: ExportableFile[],
    delay = 500
): Promise<void> {
    for (const file of files) {
        const dataUrl = getCanvasDataUrl(file.canvas, file.format);
        downloadSingle(dataUrl, file.filename);
        // Small delay between downloads to prevent browser issues
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

/**
 * Convert data URL to Blob
 */
function dataUrlToBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * Create and download a ZIP file containing all watermarked images
 */
export async function downloadZip(
    files: ExportableFile[],
    zipFilename = 'watermarked-images.zip'
): Promise<void> {
    const zip = new JSZip();

    for (const file of files) {
        const dataUrl = getCanvasDataUrl(file.canvas, file.format);
        const blob = dataUrlToBlob(dataUrl);
        zip.file(file.filename, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);

    const link = document.createElement('a');
    link.download = zipFilename;
    link.href = url;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
}

/**
 * Helper to get export filename from original filename
 */
export function getExportFilename(originalName: string, index?: number): string {
    const ext = originalName.split('.').pop()?.toLowerCase() === 'png' ? 'png' : 'jpeg';
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const prefix = index !== undefined ? `${index + 1}-` : '';
    return `${prefix}watermarked-${baseName}.${ext}`;
}
