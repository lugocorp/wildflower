import { ImageAsset } from './types';

export default class AssetsManager {

    /**
     * This function loads an image asset and returns a handle for it.
     * The asset can be a subset of a larger image, such as a spritesheet.
     */
    async registerImage(src: string, left = 0, top = 0, width?: number, height?: number): Promise<ImageAsset> {
        const that = this;
        let element: HTMLImageElement = new Image();
        return new Promise((resolve, reject) => {
            element.onload = () => {
                if (width === undefined) {
                    width = element.width;
                }
                if (height === undefined) {
                    height = element.height;
                }
                resolve({ element, left, top, width, height });
            };
            element.src = src;
        });
    }

    /**
     * This function loads an audio asset and returns a handle for it
     */
    async registerAudio(src: string): Promise<HTMLAudioElement> {
        const that = this;
        const element: HTMLAudioElement = new Audio();
        return new Promise((resolve) => {
            element.onload = () => resolve(element);
            element.src = src;
        });
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