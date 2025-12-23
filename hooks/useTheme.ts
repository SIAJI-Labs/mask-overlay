"use client";

/**
 * Hook for managing theme (light/dark) with system detection and persistence
 */

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

interface UseThemeReturn {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

/**
 * Get the system's preferred color scheme
 */
function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Load theme preference from localStorage
 */
function loadTheme(): Theme {
    if (typeof window === 'undefined') return 'system';

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
    } catch {
        console.error('Failed to load theme from localStorage');
    }

    return 'system';
}

/**
 * Save theme preference to localStorage
 */
function saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        console.error('Failed to save theme to localStorage');
    }
}

/**
 * Apply theme to document
 */
function applyTheme(resolvedTheme: ResolvedTheme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    // Update meta theme-color for PWA
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
}

export function useTheme(): UseThemeReturn {
    // Use lazy initialization to avoid setState in effect
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'system';
        return loadTheme();
    });

    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
        if (typeof window === 'undefined') return 'light';
        const savedTheme = loadTheme();
        return savedTheme === 'system' ? getSystemTheme() : savedTheme;
    });

    // Apply theme on mount and when resolved theme changes
    useEffect(() => {
        applyTheme(resolvedTheme);
    }, [resolvedTheme]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                const newResolved = getSystemTheme();
                setResolvedTheme(newResolved);
                applyTheme(newResolved);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Set theme with persistence
    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        saveTheme(newTheme);

        const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
        setResolvedTheme(resolved);
        applyTheme(resolved);
    }, []);

    // Toggle between light and dark
    const toggleTheme = useCallback(() => {
        const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }, [resolvedTheme, setTheme]);

    return {
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
    };
}
