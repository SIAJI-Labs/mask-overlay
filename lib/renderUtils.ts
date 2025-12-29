/**
 * Off-screen canvas rendering utility
 * Renders a watermarked image with multiple layers to a canvas without displaying it
 */

import type { WatermarkLayer } from '@/types/files';

interface RenderOptions {
    imageSrc: string;
    layers: WatermarkLayer[];
}

/**
 * Render a single watermark layer on a canvas context
 */
function renderLayer(ctx: CanvasRenderingContext2D, layer: WatermarkLayer, canvasWidth: number, canvasHeight: number) {
    if (!layer.text.trim()) return;

    ctx.save();
    ctx.globalAlpha = layer.opacity / 100;
    ctx.fillStyle = layer.color;

    const scaledFontSize = layer.fontSize * (canvasWidth / 800);
    ctx.font = `bold ${scaledFontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (layer.mode === 'single') {
        const offsetX = (layer.offsetX / 100) * canvasWidth;
        const offsetY = (layer.offsetY / 100) * canvasHeight;

        ctx.translate(canvasWidth / 2 + offsetX, canvasHeight / 2 + offsetY);
        ctx.rotate((layer.angle * Math.PI) / 180);
        ctx.fillText(layer.text, 0, 0);
    } else {
        const textWidth = ctx.measureText(layer.text).width;
        const baseGap = textWidth * layer.gap;
        const rowGap = scaledFontSize * layer.gap * 1.5;
        const diagonal = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);
        const rows = Math.ceil(diagonal / rowGap) + 2;
        const cols = Math.ceil(diagonal / baseGap) + 2;

        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate((layer.angle * Math.PI) / 180);

        for (let row = -rows; row <= rows; row++) {
            for (let col = -cols; col <= cols; col++) {
                ctx.fillText(layer.text, col * baseGap, row * rowGap);
            }
        }
    }

    ctx.restore();
}

/**
 * Render a watermarked image with multiple layers to an off-screen canvas
 * Returns a promise that resolves with the canvas element
 */
export async function renderToCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
    const { imageSrc, layers } = options;

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

            // Draw all layers in order
            layers.forEach(layer => {
                renderLayer(ctx, layer, canvas.width, canvas.height);
            });

            resolve(canvas);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageSrc;
    });
}
