// React
import React, { useState } from "react";

// Icons
import { Settings2 } from "lucide-react";

// Shadcn/UI
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Components
import { Header } from "./Header";

interface MainLayoutProps {
    sidebar?: React.ReactNode;
    children: React.ReactNode;
}

export function MainLayout({ sidebar, children }: MainLayoutProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Desktop Sidebar (Visible on lg+, hidden on smaller) */}
                {sidebar && (
                    <div className="hidden lg:flex w-80 flex-none border-r bg-background overflow-hidden flex-col z-10">
                        {sidebar}
                    </div>
                )}

                {/* Mobile Toggle & Sheet (Visible < lg) */}
                {sidebar && (
                    <div className="lg:hidden absolute bottom-6 right-6 z-50">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
                                    <Settings2 className="h-6 w-6" />
                                    <span className="sr-only">Open Controls</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-[10px]">
                                <SheetTitle className="sr-only">Controls</SheetTitle>
                                <div className="h-full overflow-hidden rounded-t-[10px]">
                                    {/* Create a clone/wrapper to ensure proper rendering context if needed */}
                                    {sidebar}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}

                {/* Main Content / Canvas Area */}
                <div className="flex-1 bg-muted/10 overflow-hidden relative flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}

