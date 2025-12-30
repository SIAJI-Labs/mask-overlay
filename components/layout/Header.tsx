// React
"use client";

import React from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";

// Icons
import { Lock } from "lucide-react";

// Shadcn/UI
import { Badge } from "@/components/ui/badge";

// Features
import { ThemeToggle } from "@/components/features/ThemeToggle";

// Providers
import { useServiceWorker } from "@/components/providers/service-worker-provider";

export function Header() {
  const { version } = useServiceWorker();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/icons/icon-192.png"
            alt="Markly Logo"
            width={28}
            height={28}
            className="rounded"
            unoptimized
          />
          <div className="flex items-center gap-2">
            <span className="font-bold hidden sm:inline-block">Markly</span>
            <span className="font-bold sm:hidden">Markly</span>
            {version && version !== "development" && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 font-mono font-normal hidden sm:inline-flex"
              >
                v{version}
              </Badge>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-normal py-1.5 h-7"
          >
            <Lock className="h-3.5 w-3.5 text-green-600 mb-[1px]" />
            <span className="text-green-700 dark:text-green-400 font-medium leading-none">
              100% Offline • No Upload
            </span>
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
