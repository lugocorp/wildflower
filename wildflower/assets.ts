import { ImageAsset } from './types';

export default class AssetsManager {
    private images: Record<string, HTMLImageElement> = {};
    private imageAssets: Record<string, ImageAsset> = {};
    private audioAssets: Record<string, HTMLAudioElement> = {};

    /**
     * This function loads an image asset and returns a handle for it.
     * The asset can be a subset of a larger image, such as a spritesheet.
     */
    async registerImage(key: string, src: string, left = 0, top = 0, width?: number, height?: number): Promise<ImageAsset> {
        if (this.images[src]) {
            const element: HTMLImageElement = this.images[src];
            return { element, left, top, width: isNaN(width) ? element.width : width, height: isNaN(height) ? element.height : height };
        }
        const element: HTMLImageElement = new Image();
        this.images[src] = element;
        const that = this;
        return new Promise((resolve) => {
            element.onload = () => {
                that.images[src] = element;
                const asset: ImageAsset = { element, left, top, width: (isNaN(width) ? element.width : width), height: (isNaN(height) ? element.height : height) };
                that.imageAssets[key] = asset;
                resolve(asset);
            };
            element.src = src;
        });
    }

    /**
     * This function loads an audio asset and returns a handle for it
     */
    async registerAudio(key: string, src: string): Promise<HTMLAudioElement> {
        const element: HTMLAudioElement = new Audio();
        this.audioAssets[key] = element;
        return new Promise((resolve) => {
            element.onload = () => resolve(element);
            element.src = src;
        });
    }

    /**
     * This function retrieves a previously loaded image asset
     */
    getImage(key: string): ImageAsset {
        return this.imageAssets[key];
    }

    /**
     * This function retrieves a previously loaded audio asset
     */
    getAudio(key: string): HTMLAudioElement {
        return this.audioAssets[key];
    }

    /**
     * This functions unloads a loaded resource
     */
    unload(key: string) {
        delete this.imageAssets[key];
        delete this.audioAssets[key];
    }

    /**
     * This function draws an image asset that was loaded by this class
     */
    draw(ctx: CanvasRenderingContext2D, image: ImageAsset, x: number, y: number, width?: number, height?: number): void {
        ctx.drawImage(image.element, image.left, image.top, image.width, image.height, x, y, width || image.width, height || image.height);
    }

    /**
     * This function plays an audio asset, restarting it if necessary
     */
    play(audio: HTMLAudioElement): void {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}