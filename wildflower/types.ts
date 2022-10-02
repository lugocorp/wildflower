
/**
 * Represents the different types of mouse events.
 */
export enum MouseType {
    MOVE,
    DOWN,
    UP
}

/**
 * Represents the different types of keyboard events.
 */
export enum KeyType {
    DOWN,
    UP
}

/**
 * This type represents a loaded image asset.
 * It contains an HTML image element to be referenced as well as a bounding rectangle.
 * This allows individual sprites to be used from a spritesheet.
 */
export interface ImageAsset {
    element: HTMLImageElement;
    left: number;
    top: number;
    width: number;
    height: number;
}