import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTemplates } from '@/hooks/useTemplates';
import { STORAGE_KEY, BUILT_IN_TEMPLATES } from '@/types/templates';
import { DEFAULT_SETTINGS } from '@/types/files';

// Mock localStorage
const mockStorage: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => mockStorage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
    }),
    clear: vi.fn(() => {
        Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    }),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

describe('useTemplates', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorageMock.clear();
    });

    describe('initial state', () => {
        it('returns built-in templates on first load', () => {
            const { result } = renderHook(() => useTemplates());

            expect(result.current.templates.length).toBe(BUILT_IN_TEMPLATES.length);
            expect(result.current.templates.every(t => t.isBuiltIn)).toBe(true);
        });

        it('loads custom templates from localStorage', () => {
            const customTemplate = {
                id: 'custom-1',
                name: 'My Template',
                settings: DEFAULT_SETTINGS,
                createdAt: Date.now(),
                isBuiltIn: false,
            };
            mockStorage[STORAGE_KEY] = JSON.stringify([customTemplate]);

            const { result } = renderHook(() => useTemplates());

            // Built-in + custom
            expect(result.current.templates.length).toBe(BUILT_IN_TEMPLATES.length + 1);
        });
    });

    describe('saveTemplate', () => {
        it('creates a new template with unique ID', () => {
            const { result } = renderHook(() => useTemplates());

            act(() => {
                result.current.saveTemplate('Test Template', DEFAULT_SETTINGS);
            });

            expect(result.current.templates.length).toBe(BUILT_IN_TEMPLATES.length + 1);
            const newTemplate = result.current.templates.find(t => t.name === 'Test Template');
            expect(newTemplate).toBeDefined();
            expect(newTemplate?.isBuiltIn).toBe(false);
            expect(newTemplate?.id).toContain('template-');
        });

        it('persists new template to localStorage', () => {
            const { result } = renderHook(() => useTemplates());

            act(() => {
                result.current.saveTemplate('Saved Template', DEFAULT_SETTINGS);
            });

            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                STORAGE_KEY,
                expect.stringContaining('Saved Template')
            );
        });
    });

    describe('deleteTemplate', () => {
        it('deletes custom templates', () => {
            const customTemplate = {
                id: 'custom-1',
                name: 'My Template',
                settings: DEFAULT_SETTINGS,
                createdAt: Date.now(),
                isBuiltIn: false,
            };
            mockStorage[STORAGE_KEY] = JSON.stringify([customTemplate]);

            const { result } = renderHook(() => useTemplates());
            const initialCount = result.current.templates.length;

            act(() => {
                const success = result.current.deleteTemplate('custom-1');
                expect(success).toBe(true);
            });

            expect(result.current.templates.length).toBe(initialCount - 1);
        });

        it('prevents deletion of built-in templates', () => {
            const { result } = renderHook(() => useTemplates());
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            act(() => {
                const success = result.current.deleteTemplate('builtin-confidential');
                expect(success).toBe(false);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Cannot delete built-in templates');
            consoleSpy.mockRestore();
        });
    });

    describe('updateTemplate', () => {
        it('updates custom template settings', () => {
            const customTemplate = {
                id: 'custom-1',
                name: 'My Template',
                settings: DEFAULT_SETTINGS,
                createdAt: Date.now(),
                isBuiltIn: false,
            };
            mockStorage[STORAGE_KEY] = JSON.stringify([customTemplate]);

            const { result } = renderHook(() => useTemplates());

            const newSettings = { ...DEFAULT_SETTINGS, text: 'NEW TEXT', fontSize: 48 };

            act(() => {
                const success = result.current.updateTemplate('custom-1', newSettings);
                expect(success).toBe(true);
            });

            const updated = result.current.templates.find(t => t.id === 'custom-1');
            expect(updated?.settings.text).toBe('NEW TEXT');
            expect(updated?.settings.fontSize).toBe(48);
        });

        it('prevents updating built-in templates', () => {
            const { result } = renderHook(() => useTemplates());
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            act(() => {
                const success = result.current.updateTemplate('builtin-confidential', DEFAULT_SETTINGS);
                expect(success).toBe(false);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Cannot update built-in templates');
            consoleSpy.mockRestore();
        });
    });

    describe('renameTemplate', () => {
        it('renames custom template', () => {
            const customTemplate = {
                id: 'custom-1',
                name: 'Old Name',
                settings: DEFAULT_SETTINGS,
                createdAt: Date.now(),
                isBuiltIn: false,
            };
            mockStorage[STORAGE_KEY] = JSON.stringify([customTemplate]);

            const { result } = renderHook(() => useTemplates());

            act(() => {
                const success = result.current.renameTemplate('custom-1', 'New Name');
                expect(success).toBe(true);
            });

            const renamed = result.current.templates.find(t => t.id === 'custom-1');
            expect(renamed?.name).toBe('New Name');
        });

        it('prevents renaming built-in templates', () => {
            const { result } = renderHook(() => useTemplates());
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            act(() => {
                const success = result.current.renameTemplate('builtin-confidential', 'Hacked');
                expect(success).toBe(false);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Cannot rename built-in templates');
            consoleSpy.mockRestore();
        });
    });

    describe('getTemplate', () => {
        it('finds template by ID', () => {
            const { result } = renderHook(() => useTemplates());

            const template = result.current.getTemplate('builtin-confidential');

            expect(template).toBeDefined();
            expect(template?.name).toBe('CONFIDENTIAL');
        });

        it('returns undefined for non-existent ID', () => {
            const { result } = renderHook(() => useTemplates());

            const template = result.current.getTemplate('non-existent');

            expect(template).toBeUndefined();
        });
    });
});
