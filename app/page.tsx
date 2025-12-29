"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/features/ThemeToggle";
import {
    ShieldCheck,
    WifiOff,
    Layers,
    Zap,
    FileCheck,
    Github,
    Building2,
    Users,
    FileText,
    Lock,
    HelpCircle,
    CheckCircle2
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <span className="text-primary">Mask</span>Overlay
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/app">
                            <Button>Launch App</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 space-y-8 text-center px-4 bg-gradient-to-b from-background to-muted/30">
                <div className="max-w-3xl space-y-4 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                        <WifiOff className="w-3 h-3 mr-1" />
                        100% Offline Processing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
                        Securely Watermark <br />
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Confidential Documents
                        </span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                        Add overlays and watermarks to your ID cards and sensitive files without them ever leaving your device.
                        Secure, fast, and private by design.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8 delay-200">
                    <Link href="/app">
                        <Button size="lg" className="h-12 px-8 text-lg gap-2">
                            <Zap className="w-5 h-5" />
                            Start Watermarking
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-lg" asChild>
                        <Link href="https://github.com/sieg-g/mask-overlay" target="_blank">
                            <Github className="w-5 h-5 mr-2" />
                            View on GitHub
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-muted/50 border-t">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why choose MaskOverlay?</h2>
                        <p className="mt-4 text-muted-foreground md:text-lg">Built for privacy, speed, and ease of use.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
                            title="Privacy First"
                            description="Your files never leave your browser. All processing happens locally on your device via Canvas API."
                        />
                        <FeatureCard
                            icon={<FileCheck className="w-10 h-10 text-blue-500" />}
                            title="Batch Processing"
                            description="Upload and process multiple files at once. Export individually or as a ZIP archive."
                        />
                        <FeatureCard
                            icon={<Layers className="w-10 h-10 text-purple-500" />}
                            title="Smart Templates"
                            description="Save your favorite watermark settings as templates for quick reuse on different documents."
                        />
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 border-t">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Who is this for?</h2>
                        <p className="mt-4 text-muted-foreground md:text-lg">Perfect for professionals handling sensitive data.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <UseCaseCard
                            icon={<Users className="w-8 h-8 text-indigo-500" />}
                            title="HR & Recruitment"
                            description="Securely watermark candidate ID proofs and documents before sharing internally."
                        />
                        <UseCaseCard
                            icon={<Building2 className="w-8 h-8 text-orange-500" />}
                            title="Real Estate Agents"
                            description="Protect property documents and client IDs with branded overlays."
                        />
                        <UseCaseCard
                            icon={<FileText className="w-8 h-8 text-cyan-500" />}
                            title="Lending & Finance"
                            description="Add &apos;FOR VERIFICATION ONLY&apos; watermarks to loan application documents."
                        />
                    </div>
                </div>
            </section>

            {/* Security Deep Dive */}
            <section className="py-20 bg-muted/30 border-t">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                <Lock className="w-3 h-3 mr-1" />
                                Technical Security
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How &quot;Offline&quot; Actually Works</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Unlike other &quot;free&quot; online tools, MaskOverlay does not have a backend server that processes your images.
                                </p>
                                <p>
                                    We use the <strong>HTML5 Canvas API</strong> and <strong>WebAssembly</strong> to process everything directly in your browser&apos;s memory. When you click &quot;Export&quot;, the file is generated instantly on your device.
                                </p>
                                <ul className="space-y-2 pt-2">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span>No image data uploads</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span>No analytics tracking on sensitive inputs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span>Works even if you disconnect Wi-Fi</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative rounded-2xl border bg-background p-8 shadow-lg">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
                            <div className="relative z-10 space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50 border">
                                    <code className="text-sm font-mono text-muted-foreground">
                                        {"// Pseudocode of our processing"}<br />
                                        const canvas = document.createElement(&apos;canvas&apos;);<br />
                                        const ctx = canvas.getContext(&apos;2d&apos;);<br />
                                        <br />
                                        {"// 🔒 Happens in YOUR RAM"}<br />
                                        ctx.drawImage(userFile, 0, 0);<br />
                                        ctx.fillText(&quot;WATERMARK&quot;, x, y);<br />
                                        <br />
                                        {"// 💾 Saves directly to disk"}<br />
                                        const blob = await canvas.toBlob();
                                    </code>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Your data never leaves this loop.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 border-t">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it really 100% offline?</AccordionTrigger>
                            <AccordionContent>
                                Yes. Once the website loads, you can turn off your internet connection and the tool will still work perfectly. We use a Service Worker to cache the application code, making it a fully functional Progressive Web App (PWA) that works offline.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Do you save my documents?</AccordionTrigger>
                            <AccordionContent>
                                No. We do not have a database. Your documents are temporarily loaded into your browser&apos;s memory for processing and are cleared as soon as you close the tab or refresh the page.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I watermark multiple files at once?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely! You can upload up to 5 files at a time. The tool provides a carousel interface to customize each one individually or apply settings to all of them. You can then export them as a ZIP file.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                            <AccordionContent>
                                Currently, we support <strong>JPG, JPEG, and PNG</strong> files. We plan to add PDF support in a future update.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>How can I verify the security myself?</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>We believe in &quot;Trust, but Verify&quot;. You can check our claims technically:</p>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">1. Network Audit</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Open DevTools (F12) &gt; Network tab. Clear it, then upload and export a file. You will see <strong>zero network requests</strong> being made to any server.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">2. Offline Mode</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Disconnect your Wi-Fi or go to DevTools &gt; Application &gt; Service Workers &gt; check &quot;Offline&quot;. The app works perfectly without internet.
                                        </p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 border-t">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-16 md:text-4xl">Three Simple Steps</h2>
                    <div className="grid gap-8 md:grid-cols-3 text-center">
                        <Step
                            number="1"
                            title="Upload Files"
                            description="Drag and drop your ID cards or documents. Supports generic image files."
                        />
                        <Step
                            number="2"
                            title="Customize"
                            description="Adjust text, color, transparency, and density. Apply template presets instantly."
                        />
                        <Step
                            number="3"
                            title="Export"
                            description="Download your watermarked files instantly. No servers, no waiting."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Ready to secure your documents?</h2>
                    <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        No signup required. No credit card. Just secure, offline watermarking.
                    </p>
                    <Link href="/app">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                            <Zap className="w-5 h-5" />
                            Launch App Now
                        </Button>
                    </Link>
                </div>
            </section>



            {/* Footer */}
            <footer className="border-t py-8 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} MaskOverlay. Open Source Project.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link href="https://github.com/sieg-g/mask-overlay" className="hover:underline">GitHub</Link>
                        <Link href="/app" className="hover:underline">Launch App</Link>
                    </div>
                </div>
            </footer>
        </div >
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border transition-shadow hover:shadow-md">
            <div className="mb-4 p-3 bg-muted/50 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

function UseCaseCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
function Step({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                {number}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground max-w-[250px] mx-auto">{description}</p>
        </div>
    );
}
