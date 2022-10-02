import { MouseType, KeyType } from './types';

/**
 * This class helps structure your app.
 * You override it to define each of the unique screens for your game.
 * It has several methods that Wildflower will handle calling for you.
 */
export default class View {

    /**
     * This function runs whenever your view becomes active.
     * You can place setup code here, such as loading assets.
     */
    async handleStart(): Promise<void> {}

    /**
     * This function gets fired whenever the player presses up or down on the mouse, or moves it.
     */
    handleMouse(type: MouseType, x: number, y: number): void {}

    /**
     * This function fires whenever the player presses a key up or down.
     */
    handleKey(type: KeyType, key: string): void {}

    /**
     * This function should implement your view's frame update and draw logic.
     * It can be triggered by calling your game's `frame()` function.
     * The `delta` parameter will be set to the number of seconds that have passed since this function was last called.
     * It will likely be a small decimal value.
     */
    handleFrame(ctx: CanvasRenderingContext2D, delta: number): void {}
}