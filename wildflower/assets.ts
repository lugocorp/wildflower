import { ImageAsset } from './types';

export default class AssetsManager {
    private images: Record<string, HTMLImageElement> = {};
    private imageAssets: Record<string, ImageAsset> = {};
    private audioAssets: Record<string, HTMLAudioElement> = {};
    /** @hidden */
    _pixelMode = false;

    /**
     * This function loads an image asset and returns a handle for it.
     * The asset can be a subset of a larger image, such as a spritesheet.
     * @param {string} key A string you'll use to access this asset in the future
     * @param {string} src A path to the asset, relative to your `www` folder
     * @param {number} left The horizontal coordinate of your asset, if it's in a spritesheet
     * @param {number} top The vertical coordinate of your asset, if it's in a spritesheet
     * @param {number} left The width of your asset, if it's in a spritesheet
     * @param {number} left The height of your asset, if it's in a spritesheet
     * @returns {Promise<ImageAsset>} A promise that resolves when the asset has successfully loaded
     */
    async registerImage(key: string, src: string, left = 0, top = 0, width?: number, height?: number): Promise<ImageAsset> {
        if (this.images[src]) {
            const element: HTMLImageElement = this.images[src];
            const asset: ImageAsset = { element, left, top, width: isNaN(width) ? element.width : width, height: isNaN(height) ? element.height : height };
            this.imageAssets[key] = asset;
            return asset;
        }
        const element: HTMLImageElement = new Image();
        this.images[src] = element;
        const that = this;
        return new Promise((resolve) => {
            element.onerror = (err) => { throw `Failure while loading image asset '${src}'` };
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
     * This function loads an audio asset and returns a handle for it.
     * The handle is an HTML element that can be accessed using standard HTML5 methods.
     * @param {string} key A string you'll use to access this asset in the future
     * @param {string} src A path to the asset, relative to your `www` folder
     * @returns {Promise<HTMLAudioElement>} A promise that resolves when the asset has successfully loaded
     */
    async registerAudio(key: string, src: string): Promise<HTMLAudioElement> {
        const element: HTMLAudioElement = new Audio();
        this.audioAssets[key] = element;
        return new Promise((resolve) => {
            element.onerror = (err) => { throw `Failure while loading audio asset '${src}'` };
            element.onload = () => resolve(element);
            element.src = src;
        });
    }

    /**
     * This function retrieves a previously loaded image asset.
     * @param {string} key The string you passed while loading your desired asset
     * @returns {ImageAsset} The asset you want to retrieve
     */
    getImage(key: string): ImageAsset {
        const asset: ImageAsset = this.imageAssets[key];
        if (!asset) {
            throw new Error(`Undefined image asset '${key}'`);
        }
        return asset;
    }

    /**
     * This function retrieves a previously loaded audio asset.
     * @param {string} key The string you passed while loading your desired asset
     * @returns {ImageAsset} The asset you want to retrieve
     */
    getAudio(key: string): HTMLAudioElement {
        const asset: HTMLAudioElement = this.audioAssets[key];
        if (!asset) {
            throw new Error(`Undefined audio asset '${key}'`);
        }
        return asset;
    }

    /**
     * This functions unloads a loaded resource.
     * @param {string} key The string you passed while loading your desired asset
     */
    unload(key: string): void {
        delete this.imageAssets[key];
        delete this.audioAssets[key];
    }

    /**
     * This function draws an image asset that was loaded by this class.
     * @param {CanvasRenderingContext2D} ctx The HTML5 2D context to make draw calls on
     * @param {ImageAsset} image The image asset to be drawn
     * @param {number} x The horizontal coordinate to draw the image at
     * @param {number} y The vertical coordinate to draw the image at
     * @param {number} width The width to scale the image to when it is drawn
     * @param {number} height The height to scale the image to when it is drawn
     */
    draw(ctx: CanvasRenderingContext2D, image: ImageAsset, x: number, y: number, width?: number, height?: number): void {
        if (this._pixelMode) {
            ctx.imageSmoothingEnabled = false;
        }
        ctx.drawImage(image.element, image.left, image.top, image.width, image.height, x, y, width || image.width, height || image.height);
    }

    /**
     * This function plays an audio asset.
     * The asset restarts first if it has already played or is currently playing.
     * @param {HTMLAudioElement} audio An audio asset
     */
    play(audio: HTMLAudioElement): void {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}