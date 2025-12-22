"use client";

import { useEffect, useCallback } from "react";

interface KeyboardShortcutsOptions {
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onRotateLeft?: () => void;
    onRotateRight?: () => void;
    onExport?: () => void;
    enabled?: boolean;
}

export function useKeyboardShortcuts({
    onZoomIn,
    onZoomOut,
    onRotateLeft,
    onRotateRight,
    onExport,
    enabled = true,
}: KeyboardShortcutsOptions) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // Don't trigger if typing in an input
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            switch (e.key) {
                case "+":
                case "=":
                    e.preventDefault();
                    onZoomIn?.();
                    break;
                case "-":
                    e.preventDefault();
                    onZoomOut?.();
                    break;
                case "ArrowLeft":
                    if (!e.metaKey && !e.ctrlKey) {
                        e.preventDefault();
                        onRotateLeft?.();
                    }
                    break;
                case "ArrowRight":
                    if (!e.metaKey && !e.ctrlKey) {
                        e.preventDefault();
                        onRotateRight?.();
                    }
                    break;
                case "e":
                case "E":
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        onExport?.();
                    }
                    break;
            }
        },
        [onZoomIn, onZoomOut, onRotateLeft, onRotateRight, onExport]
    );

    useEffect(() => {
        if (!enabled) return;

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [enabled, handleKeyDown]);
}
