"use client";

// Context Provider
import { useServiceWorker } from "@/components/providers/service-worker-provider";

// Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AppUpdateNotification() {
  // Fetch Service Worker from Provider
  const { hasUpdate, version } = useServiceWorker();

  // Handle Dialog State - derived from hasUpdate state
  const dialogState =
    hasUpdate && process.env.NODE_ENV === "production";

  const handleClose = () => {
    // Do hard reload
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SKIP_WAITING",
      });
    }

    window.location.reload();
  };

  return (
    <Dialog open={dialogState} onOpenChange={handleClose}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Update Available</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            New content is available. Please refresh the page to see the latest
            updates.
          </p>
          <p className="text-xs text-muted-foreground">
            Version: {version ?? "development"}
          </p>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleClose}>
            Refresh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
