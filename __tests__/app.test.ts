import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('should pass sanity check', () => {
        expect(1 + 1).toBe(2);
    });

    it('should have correct exports from utils', async () => {
        const { cn } = await import('@/lib/utils');
        expect(typeof cn).toBe('function');
    });
});
