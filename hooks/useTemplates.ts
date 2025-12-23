"use client";

/**
 * Hook for managing watermark templates with localStorage persistence
 */

import { useState, useCallback, useEffect } from 'react';
import type { WatermarkSettings } from '@/types/files';
import { Template, STORAGE_KEY, BUILT_IN_TEMPLATES } from '@/types/templates';

interface UseTemplatesReturn {
    templates: Template[];
    saveTemplate: (name: string, settings: WatermarkSettings) => Template;
    updateTemplate: (id: string, settings: WatermarkSettings) => boolean;
    renameTemplate: (id: string, newName: string) => boolean;
    deleteTemplate: (id: string) => boolean;
    getTemplate: (id: string) => Template | undefined;
}

/**
 * Load templates from localStorage
 */
function loadFromStorage(): Template[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored) as Template[];
    } catch {
        console.error('Failed to load templates from localStorage');
        return [];
    }
}

/**
 * Save templates to localStorage
 */
function saveToStorage(templates: Template[]): void {
    if (typeof window === 'undefined') return;

    try {
        // Only save custom templates (not built-in)
        const customTemplates = templates.filter(t => !t.isBuiltIn);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
    } catch {
        console.error('Failed to save templates to localStorage');
    }
}

/**
 * Generate a unique ID for new templates
 */
function generateId(): string {
    return `template-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTemplates(): UseTemplatesReturn {
    const [customTemplates, setCustomTemplates] = useState<Template[]>([]);

    // Load custom templates from localStorage on mount
    useEffect(() => {
        setCustomTemplates(loadFromStorage());
    }, []);

    // Combine built-in and custom templates
    const templates = [...BUILT_IN_TEMPLATES, ...customTemplates];

    // Save a new template
    const saveTemplate = useCallback((name: string, settings: WatermarkSettings): Template => {
        const newTemplate: Template = {
            id: generateId(),
            name: name.trim(),
            settings: { ...settings },
            createdAt: Date.now(),
            isBuiltIn: false,
        };

        setCustomTemplates(prev => {
            const updated = [...prev, newTemplate];
            saveToStorage(updated);
            return updated;
        });

        return newTemplate;
    }, []);

    // Update an existing template's settings
    const updateTemplate = useCallback((id: string, settings: WatermarkSettings): boolean => {
        // Cannot update built-in templates
        if (BUILT_IN_TEMPLATES.some(t => t.id === id)) {
            console.warn('Cannot update built-in templates');
            return false;
        }

        setCustomTemplates(prev => {
            const updated = prev.map(t =>
                t.id === id ? { ...t, settings: { ...settings } } : t
            );
            saveToStorage(updated);
            return updated;
        });

        return true;
    }, []);

    // Rename an existing template
    const renameTemplate = useCallback((id: string, newName: string): boolean => {
        // Cannot rename built-in templates
        if (BUILT_IN_TEMPLATES.some(t => t.id === id)) {
            console.warn('Cannot rename built-in templates');
            return false;
        }

        setCustomTemplates(prev => {
            const updated = prev.map(t =>
                t.id === id ? { ...t, name: newName.trim() } : t
            );
            saveToStorage(updated);
            return updated;
        });

        return true;
    }, []);

    // Delete a template (only custom templates can be deleted)
    const deleteTemplate = useCallback((id: string): boolean => {
        // Check if it's a built-in template
        if (BUILT_IN_TEMPLATES.some(t => t.id === id)) {
            console.warn('Cannot delete built-in templates');
            return false;
        }

        setCustomTemplates(prev => {
            const updated = prev.filter(t => t.id !== id);
            saveToStorage(updated);
            return updated;
        });

        return true;
    }, []);

    // Get a template by ID
    const getTemplate = useCallback((id: string): Template | undefined => {
        return templates.find(t => t.id === id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customTemplates]);

    return {
        templates,
        saveTemplate,
        updateTemplate,
        renameTemplate,
        deleteTemplate,
        getTemplate,
    };
}
