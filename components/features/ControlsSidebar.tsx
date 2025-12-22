import React from "react";


export function ControlsSidebar() {
    return (
        <aside className="w-full lg:w-80 lg:border-r bg-background flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Controls</h2>
                <p className="text-sm text-muted-foreground">Customize your watermark</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Placeholder for Quick Presets */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium leading-none">Presets (Coming Soon)</h3>
                    <div className="h-10 bg-muted/50 rounded-md animate-pulse" />
                </div>

                {/* Placeholder for Text Input */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium leading-none">Watermark Text</h3>
                    <div className="h-10 bg-muted/50 rounded-md animate-pulse" />
                </div>

                {/* Placeholder for Pattern Toggle */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium leading-none">Pattern Mode</h3>
                    <div className="h-20 bg-muted/50 rounded-md animate-pulse" />
                </div>

                {/* Placeholder for Sliders */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium leading-none">Font Size</h3>
                        <div className="h-4 bg-muted/50 rounded-md animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium leading-none">Opacity</h3>
                        <div className="h-4 bg-muted/50 rounded-md animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t bg-muted/10 space-y-2">
                <div className="h-10 bg-muted/50 rounded-md animate-pulse" />
                <div className="h-10 bg-muted/50 rounded-md animate-pulse" />
            </div>
        </aside>
    );
}
