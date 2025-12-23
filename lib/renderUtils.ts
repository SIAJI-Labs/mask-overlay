/**
 * Off-screen canvas rendering utility
 * Renders a watermarked image to a canvas without displaying it
 */

import type { WatermarkSettings } from '@/types/files';

interface RenderOptions {
    imageSrc: string;
    settings: WatermarkSettings;
}

/**
 * Render a watermarked image to an off-screen canvas
 * Returns a promise that resolves with the canvas element
 */
export async function renderToCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
    const { imageSrc, settings } = options;

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image
            ctx.drawImage(img, 0, 0);

            // Draw watermark
            if (settings.text.trim()) {
                ctx.save();
                ctx.globalAlpha = settings.opacity / 100;
                ctx.fillStyle = settings.color;

                const scaledFontSize = settings.fontSize * (canvas.width / 800);
                ctx.font = `bold ${scaledFontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                if (settings.mode === 'single') {
                    const offsetX = (settings.offsetX / 100) * canvas.width;
                    const offsetY = (settings.offsetY / 100) * canvas.height;

                    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
                    ctx.rotate((settings.angle * Math.PI) / 180);
                    ctx.fillText(settings.text, 0, 0);
                } else {
                    const textWidth = ctx.measureText(settings.text).width;
                    const baseGap = textWidth * settings.gap;
                    const rowGap = scaledFontSize * settings.gap * 1.5;
                    const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
                    const rows = Math.ceil(diagonal / rowGap) + 2;
                    const cols = Math.ceil(diagonal / baseGap) + 2;

                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate((settings.angle * Math.PI) / 180);

                    for (let row = -rows; row <= rows; row++) {
                        for (let col = -cols; col <= cols; col++) {
                            ctx.fillText(settings.text, col * baseGap, row * rowGap);
                        }
                    }
                }

                ctx.restore();
            }

            resolve(canvas);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageSrc;
    });
}
