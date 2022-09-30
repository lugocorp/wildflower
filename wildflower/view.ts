import { MouseType, KeyType } from './types';

export default class View {

    /**
     * This function gets run when the view becomes visible
     */
    async handleStart(): Promise<void> {}

    /**
     * This function is a mouse user event hook
     */
    handleMouse(type: MouseType, x: number, y: number): void {}

    /**
     * This function is a keyboard user event hook
     */
    handleKey(type: KeyType, key: string): void {}

    /**
     * This function handles your draw logic
     */
    handleFrame(ctx: CanvasRenderingContext2D, delta: number): void {}
}