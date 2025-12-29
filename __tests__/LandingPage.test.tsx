
import { render, screen } from "@testing-library/react";
import LandingPage from "../app/page";
import { describe, it, expect, vi } from "vitest";

// Mock next/link to behave like a normal anchor tag
vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: React.ReactNode; href: string }) => {
            return <a href={href}>{children}</a>;
        },
    };
});

// Mock matchMedia for Radix UI (Accordion)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe("LandingPage", () => {
    it("renders the hero section with main heading", () => {
        render(<LandingPage />);
        expect(
            screen.getByRole("heading", { name: /Securely Watermark/i })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/100% Offline Processing/i)
        ).toBeInTheDocument();
    });

    it("renders the Use Cases section", () => {
        render(<LandingPage />);
        expect(screen.getByText(/Who is this for\?/i)).toBeInTheDocument();
        expect(screen.getByText(/HR & Recruitment/i)).toBeInTheDocument();
        expect(screen.getByText(/Real Estate Agents/i)).toBeInTheDocument();
        expect(screen.getByText(/Lending & Finance/i)).toBeInTheDocument();
    });

    it("renders the Security Deep Dive section", () => {
        render(<LandingPage />);
        expect(screen.getByText(/How "Offline" Actually Works/i)).toBeInTheDocument();
        expect(screen.getByText(/No image data uploads/i)).toBeInTheDocument();
        expect(screen.getByText(/Works even if you disconnect Wi-Fi/i)).toBeInTheDocument();
    });

    it("renders the FAQ section with the new Technical Verification item", () => {
        render(<LandingPage />);
        expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
        expect(screen.getByText(/How can I verify the security myself\?/i)).toBeInTheDocument();
    });

    it("renders the CTA section", () => {
        render(<LandingPage />);
        expect(screen.getByText(/Ready to secure your documents\?/i)).toBeInTheDocument();
        // Use getAllByText because "Launch App" might appear in header and footer too
        // But the button text "Launch App Now" is unique to CTA
        expect(screen.getByText(/Launch App Now/i)).toBeInTheDocument();
    });
});
