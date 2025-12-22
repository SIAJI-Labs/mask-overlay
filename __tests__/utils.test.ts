import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
    it('merges class names correctly', () => {
        const result = cn('foo', 'bar');
        expect(result).toBe('foo bar');
    });

    it('handles conditional classes', () => {
        const result = cn('base', false && 'hidden', true && 'visible');
        expect(result).toBe('base visible');
    });

    it('handles tailwind merge correctly', () => {
        const result = cn('px-2', 'px-4');
        expect(result).toBe('px-4');
    });

    it('handles undefined and null', () => {
        const result = cn('foo', undefined, null, 'bar');
        expect(result).toBe('foo bar');
    });
});
