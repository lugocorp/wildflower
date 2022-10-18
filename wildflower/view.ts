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
     * @returns {Promise<void>} A promise that resolves once your `View` has been set up
     */
    async handleStart(): Promise<void> {}

    /**
     * This function gets fired whenever the player presses up or down on the mouse, or moves it.
     * @param {MouseType} type The type of mouse event that triggered this function call
     * @param {number} x The horizontal coordinate of the mouse event that triggered this function call
     * @param {number} y The vertical coordinate of the mouse event that triggered this function call
     */
    handleMouse(type: MouseType, x: number, y: number): void {}

    /**
     * This function fires whenever the player presses a key up or down.
     * @param {KeyType} type The type of key event that triggered this function call
     * @param {string} key The keyboard key of the event that triggered this function call
     */
    handleKey(type: KeyType, key: string): void {}

    /**
     * This function should implement your view's frame update and draw logic.
     * It can be triggered by calling your game's `frame()` function.
     * @param {CanvasRenderingContext2D} ctx The HTML5 2D context to make draw calls on
     * @param {number} delta The number of seconds that have passed since this function was last called (likely a decimal value)
     */
    handleFrame(ctx: CanvasRenderingContext2D, delta: number): void {}
}