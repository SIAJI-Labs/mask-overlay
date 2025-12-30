"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the props for the ServiceWorkerProvider component
type ServiceWorkerProviderProps = {
  children: React.ReactNode;
};

// Define the state shape for the ServiceWorkerProvider
type ServiceWorkerProviderState = {
  registration: ServiceWorkerRegistration | null; // Holds the service worker registration
  hasUpdate: boolean;
  version: string | null;
};

// Initial state with no registration
const initialState: ServiceWorkerProviderState = {
  registration: null,
  hasUpdate: false,
  version: "development",
};

// Create a context for the service worker registration
const ServiceWorkerContext =
  createContext<ServiceWorkerProviderState>(initialState);

export function ServiceWorkerProvider({
  children,
  ...props
}: ServiceWorkerProviderProps) {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [version] = useState<string | null>(() => {
    const result =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_VERSION || null
        : "development";

    return result;
  });

  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Use a dynamic timestamp in production and a static value in development
    // console.log(`Executing script in Service Worker contextProvider`);
    // console.log(`Latest version: ${version}`);

    if ("serviceWorker" in navigator) {
      // console.log(`Service Worker are available`);

      navigator.serviceWorker
        .register(`/sw.js?v=${version}`, {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          // console.log(`sw script registered`, registration);
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;

            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                    // console.log('New content is available; please refresh.');
                    // Send a message to the service worker to skip waiting
                    installingWorker.postMessage({ type: "SKIP_WAITING" });

                    // Update state
                    setHasUpdate(true);
                  } else {
                    // Content is cached for offline use
                    // console.log('Content is cached for offline use.');
                  }
                }
              };
            }
          };

          registration.update();
          setRegistration(registration);
        });
    }
  }, [version]);

  // Provide the registration state to children components
  const value = {
    registration,
    hasUpdate,
    version,
  };

  return (
    <ServiceWorkerContext.Provider {...props} value={value}>
      {children}
    </ServiceWorkerContext.Provider>
  );
}

// Custom hook to access the service worker registration
export const useServiceWorker = () => {
  const context = useContext(ServiceWorkerContext);
  if (context === undefined) {
    throw new Error(
      "useServiceWorker must be used within a ServiceWorkerProvider"
    );
  }

  return context;
};
