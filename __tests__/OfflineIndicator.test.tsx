import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { OfflineIndicator, getSnapshot, getServerSnapshot } from '@/components/features/OfflineIndicator';

describe('OfflineIndicator', () => {
    const originalOnLine = navigator.onLine;

    beforeEach(() => {
        // Reset to original value
        Object.defineProperty(navigator, 'onLine', {
            value: originalOnLine,
            writable: true,
            configurable: true,
        });
    });

    it('renders nothing when online', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            writable: true,
            configurable: true,
        });
        const { container } = render(<OfflineIndicator />);
        expect(container.firstChild).toBeNull();
    });

    it('renders offline banner when offline', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            writable: true,
            configurable: true,
        });
        render(<OfflineIndicator />);
        expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });

    it('shows banner when going offline', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            writable: true,
            configurable: true,
        });
        render(<OfflineIndicator />);

        act(() => {
            Object.defineProperty(navigator, 'onLine', {
                value: false,
                writable: true,
                configurable: true,
            });
            window.dispatchEvent(new Event('offline'));
        });

        expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });

    it('hides banner when going online', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            writable: true,
            configurable: true,
        });
        const { container } = render(<OfflineIndicator />);

        act(() => {
            Object.defineProperty(navigator, 'onLine', {
                value: true,
                writable: true,
                configurable: true,
            });
            window.dispatchEvent(new Event('online'));
        });

        expect(container.querySelector('[class*="fixed"]')).toBeNull();
    });
});

describe('OfflineIndicator utilities', () => {
    it('getSnapshot returns navigator.onLine value', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            writable: true,
            configurable: true,
        });
        expect(getSnapshot()).toBe(true);

        Object.defineProperty(navigator, 'onLine', {
            value: false,
            writable: true,
            configurable: true,
        });
        expect(getSnapshot()).toBe(false);
    });

    it('getServerSnapshot returns true for SSR', () => {
        expect(getServerSnapshot()).toBe(true);
    });
});
