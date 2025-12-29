import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    getExportFilename,
    getCanvasDataUrl,
    downloadSingle,
    downloadBulk,
    downloadZip
} from '@/lib/exportUtils';
import { MAX_FILES, DEFAULT_LAYER } from '@/types/files';

// Mock JSZip with a class
vi.mock('jszip', () => {
    const MockJSZip = class {
        file = vi.fn();
        generateAsync = vi.fn().mockResolvedValue(new Blob(['test'], { type: 'application/zip' }));
    };
    return { default: MockJSZip };
});

describe('exportUtils', () => {
    describe('getExportFilename', () => {
        it('generates filename without index', () => {
            const result = getExportFilename('document.png');
            expect(result).toBe('watermarked-document.png');
        });

        it('generates filename with index', () => {
            const result = getExportFilename('document.png', 0);
            expect(result).toBe('1-watermarked-document.png');
        });

        it('handles jpg files', () => {
            const result = getExportFilename('photo.jpg', 2);
            expect(result).toBe('3-watermarked-photo.jpeg');
        });

        it('handles files with multiple dots', () => {
            const result = getExportFilename('my.file.name.png');
            expect(result).toBe('watermarked-my.file.name.png');
        });

        it('defaults to jpeg for non-png files', () => {
            const result = getExportFilename('image.webp');
            expect(result).toBe('watermarked-image.jpeg');
        });
    });

    describe('getCanvasDataUrl', () => {
        it('returns data URL from canvas', () => {
            const mockCanvas = {
                toDataURL: vi.fn().mockReturnValue('data:image/png;base64,abc123'),
            } as unknown as HTMLCanvasElement;

            const result = getCanvasDataUrl(mockCanvas, 'png');
            expect(result).toBe('data:image/png;base64,abc123');
            expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png', 0.95);
        });

        it('uses custom quality', () => {
            const mockCanvas = {
                toDataURL: vi.fn().mockReturnValue('data:image/jpeg;base64,xyz'),
            } as unknown as HTMLCanvasElement;

            getCanvasDataUrl(mockCanvas, 'jpeg', 0.8);
            expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.8);
        });
    });

    describe('downloadSingle', () => {
        let mockLink: { download: string; href: string; click: ReturnType<typeof vi.fn> };
        let createElementSpy: ReturnType<typeof vi.spyOn>;

        beforeEach(() => {
            mockLink = { download: '', href: '', click: vi.fn() };
            createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLAnchorElement);
        });

        afterEach(() => {
            createElementSpy.mockRestore();
        });

        it('creates link and triggers download', () => {
            downloadSingle('data:image/png;base64,test', 'test-file.png');

            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(mockLink.download).toBe('test-file.png');
            expect(mockLink.href).toBe('data:image/png;base64,test');
            expect(mockLink.click).toHaveBeenCalled();
        });
    });

    describe('downloadBulk', () => {
        let mockLink: { download: string; href: string; click: ReturnType<typeof vi.fn> };
        let createElementSpy: ReturnType<typeof vi.spyOn>;

        beforeEach(() => {
            mockLink = { download: '', href: '', click: vi.fn() };
            createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLAnchorElement);
        });

        afterEach(() => {
            createElementSpy.mockRestore();
        });

        it('downloads multiple files', async () => {
            const mockCanvas = {
                toDataURL: vi.fn().mockReturnValue('data:image/png;base64,test'),
            } as unknown as HTMLCanvasElement;

            const files = [
                { filename: 'file1.png', canvas: mockCanvas, format: 'png' as const },
                { filename: 'file2.png', canvas: mockCanvas, format: 'png' as const },
            ];

            // Use delay of 0 for faster test
            await downloadBulk(files, 0);

            expect(mockLink.click).toHaveBeenCalledTimes(2);
            expect(mockCanvas.toDataURL).toHaveBeenCalledTimes(2);
        });
    });

    describe('downloadZip', () => {
        let mockLink: { download: string; href: string; click: ReturnType<typeof vi.fn> };
        let createElementSpy: ReturnType<typeof vi.spyOn>;
        let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
        let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;

        beforeEach(() => {
            mockLink = { download: '', href: '', click: vi.fn() };
            createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLAnchorElement);
            createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
            revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { });
        });

        afterEach(() => {
            createElementSpy.mockRestore();
            createObjectURLSpy.mockRestore();
            revokeObjectURLSpy.mockRestore();
        });

        it('creates and downloads a ZIP file', async () => {

            const mockCanvas = {
                toDataURL: vi.fn().mockReturnValue('data:image/png;base64,iVBORw0KGgo='),
            } as unknown as HTMLCanvasElement;

            const files = [
                { filename: 'file1.png', canvas: mockCanvas, format: 'png' as const },
            ];

            await downloadZip(files, 'test.zip');

            expect(createObjectURLSpy).toHaveBeenCalled();
            expect(mockLink.download).toBe('test.zip');
            expect(mockLink.href).toBe('blob:test-url');
            expect(mockLink.click).toHaveBeenCalled();
            expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:test-url');
        });
    });
});

describe('files types', () => {
    describe('DEFAULT_LAYER', () => {
        it('has correct default values', () => {
            expect(DEFAULT_LAYER.text).toBe('CONFIDENTIAL');
            expect(DEFAULT_LAYER.fontSize).toBe(32);
            expect(DEFAULT_LAYER.opacity).toBe(50);
            expect(DEFAULT_LAYER.angle).toBe(-30);
            expect(DEFAULT_LAYER.color).toBe('#000000');
            expect(DEFAULT_LAYER.mode).toBe('diagonal');
            expect(DEFAULT_LAYER.gap).toBe(1.5);
            expect(DEFAULT_LAYER.offsetX).toBe(0);
            expect(DEFAULT_LAYER.offsetY).toBe(0);
        });
    });

    describe('MAX_FILES', () => {
        it('is set to 5', () => {
            expect(MAX_FILES).toBe(5);
        });
    });
});
