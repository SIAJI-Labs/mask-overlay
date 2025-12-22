import React from "react";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                        M
                    </div>
                    <span className="font-bold hidden sm:inline-block">Privacy Watermark Tool</span>
                    <span className="font-bold sm:hidden">Privacy Mask</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1.5 text-xs sm:text-sm font-normal py-1.5 h-7">
                        <Lock className="h-3.5 w-3.5 text-green-600 mb-[1px]" />
                        <span className="text-green-700 font-medium leading-none">100% Offline • No Upload</span>
                    </Badge>
                </div>
            </div>
        </header>
    );
}
