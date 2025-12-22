declare module 'next-pwa' {
    import type { NextConfig } from 'next';

    interface PWAConfig {
        dest?: string;
        register?: boolean;
        skipWaiting?: boolean;
        disable?: boolean;
        scope?: string;
        sw?: string;
        runtimeCaching?: unknown[];
        publicExcludes?: string[];
        buildExcludes?: (string | RegExp)[];
    }

    function withPWAInit(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
    export default withPWAInit;
}
