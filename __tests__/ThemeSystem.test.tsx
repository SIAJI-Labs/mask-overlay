import { renderHook, act, render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggle } from "../components/features/ThemeToggle";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
};

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Mock PointerEvent and HTMLElement methods for Radix UI
class MockPointerEvent extends Event {
    button: number;
    ctrlKey: boolean;
    pointerType: string;

    constructor(type: string, props: PointerEventInit) {
        super(type, props);
        this.button = props.button || 0;
        this.ctrlKey = props.ctrlKey || false;
        this.pointerType = props.pointerType || 'mouse';
    }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

describe("Theme System", () => {
    beforeEach(() => {
        // Clear localStorage
        window.localStorage.clear();
        document.documentElement.className = "";
        mockMatchMedia(false); // Default to light preference
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("useTheme Hook", () => {
        it("should initialize with 'system' by default", () => {
            const { result } = renderHook(() => useTheme());
            expect(result.current.theme).toBe("system");
        });

        it("should set theme to 'dark'", () => {
            const { result } = renderHook(() => useTheme());
            act(() => {
                result.current.setTheme("dark");
            });
            expect(result.current.theme).toBe("dark");
            expect(window.localStorage.getItem("theme-preference")).toBe("dark");
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it("should set theme to 'light'", () => {
            const { result } = renderHook(() => useTheme());
            act(() => {
                result.current.setTheme("light");
            });
            expect(result.current.theme).toBe("light");
            expect(window.localStorage.getItem("theme-preference")).toBe("light");
            expect(document.documentElement.classList.contains("dark")).toBe(false);
        });

        it("should respect system preference when theme is system", () => {
            mockMatchMedia(true); // System prefers dark
            const { result } = renderHook(() => useTheme());

            // Set to system (it's default, but let's be explicit if we changed it)
            act(() => {
                result.current.setTheme("system");
            });

            // If system is dark, document should have dark class
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });
    });

    describe("ThemeToggle Component", () => {
        it("should render successfully", () => {
            render(<ThemeToggle />);
            const button = screen.getByRole("button", { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });
    });
});
