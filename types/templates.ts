/**
 * Template types for saving and loading watermark configurations
 */

import type { WatermarkSettings } from './files';

export interface Template {
    id: string;
    name: string;
    settings: WatermarkSettings;
    createdAt: number;
    isBuiltIn?: boolean;
}

export const STORAGE_KEY = 'watermark-templates';

/**
 * Built-in templates that cannot be deleted
 * These replace the old PRESETS constant
 */
export const BUILT_IN_TEMPLATES: Template[] = [
    {
        id: 'builtin-confidential',
        name: 'CONFIDENTIAL',
        settings: {
            text: 'CONFIDENTIAL',
            fontSize: 32,
            opacity: 50,
            angle: -30,
            color: '#000000',
            mode: 'diagonal',
            gap: 1.5,
            offsetX: 0,
            offsetY: 0,
        },
        createdAt: 0,
        isBuiltIn: true,
    },
    {
        id: 'builtin-verification',
        name: 'FOR VERIFICATION ONLY',
        settings: {
            text: 'FOR VERIFICATION ONLY',
            fontSize: 32,
            opacity: 50,
            angle: -30,
            color: '#000000',
            mode: 'diagonal',
            gap: 1.5,
            offsetX: 0,
            offsetY: 0,
        },
        createdAt: 0,
        isBuiltIn: true,
    },
    {
        id: 'builtin-sample',
        name: 'SAMPLE',
        settings: {
            text: 'SAMPLE',
            fontSize: 32,
            opacity: 50,
            angle: -30,
            color: '#DC2626',
            mode: 'diagonal',
            gap: 1.5,
            offsetX: 0,
            offsetY: 0,
        },
        createdAt: 0,
        isBuiltIn: true,
    },
    {
        id: 'builtin-draft',
        name: 'DRAFT',
        settings: {
            text: 'DRAFT',
            fontSize: 32,
            opacity: 50,
            angle: -30,
            color: '#000000',
            mode: 'diagonal',
            gap: 1.5,
            offsetX: 0,
            offsetY: 0,
        },
        createdAt: 0,
        isBuiltIn: true,
    },
];
