import { ImageAsset } from './types';

export default class AssetsManager {

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

    async registerAudio(src: string): Promise<HTMLAudioElement> {
        const that = this;
        const element: HTMLAudioElement = new Audio();
        return new Promise((resolve) => {
            element.onload = () => resolve(element);
            element.src = src;
        });
    }

    draw(ctx: CanvasRenderingContext2D, image: ImageAsset, x: number, y: number, width?: number, height?: number): void {
        ctx.drawImage(image.element, image.left, image.top, image.width, image.height, x, y, width || image.width, height || image.height);
    }

    play(audio: HTMLAudioElement): void {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}