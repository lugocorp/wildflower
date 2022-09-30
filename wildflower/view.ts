import { MouseType, KeyType } from './types';

export default class View {

    async handleStart(): Promise<void> {}

    handleMouse(type: MouseType, x: number, y: number): void {}

    handleKey(type: KeyType, key: string): void {}

    handleDraw(ctx: CanvasRenderingContext2D): void {}
}