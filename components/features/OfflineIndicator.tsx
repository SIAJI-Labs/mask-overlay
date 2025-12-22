"use client";

// React
import { useSyncExternalStore } from "react";

// Icons
import { WifiOff } from "lucide-react";

// External store for online status
function subscribe(callback: () => void) {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
    };
}

export function getSnapshot() {
    return navigator.onLine;
}

export function getServerSnapshot() {
    return true; // Assume online during SSR
}

export function OfflineIndicator() {
    const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (isOnline) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-2 bg-amber-500 text-amber-950 px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                <WifiOff className="h-4 w-4" />
                <span>You&apos;re offline - Changes saved locally</span>
            </div>
        </div>
    );
}
