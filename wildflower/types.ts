
/**
 * Represents the different types of mouse events.
 */
export enum MouseType {
    /**
     * A mouse move event
     */
    MOVE,

    /**
     * A mouse click down event
     */
    DOWN,

    /**
     * A mouse click up event
     */
    UP
}

/**
 * Represents the different types of keyboard events.
 */
export enum KeyType {
    /**
     * A key pressed down event
     */
    DOWN,

    /**
     * A key pressed up event
     */
    UP
}

/**
 * This type represents a loaded image asset.
 * It contains an HTML image element to be referenced as well as a bounding rectangle.
 * This allows individual sprites to be used from a spritesheet.
 */
export interface ImageAsset {
    /**
     * The underlying HTML5 image element, which may be shared between assets with the same source
     */
    element: HTMLImageElement;

    /**
     * The horizontal coordinate of the asset on the source image
     */
    left: number;

    /**
     * The vertical coordinate of the asset on the source image
     */
    top: number;

    /**
     * The width of the asset on the source image
     */
    width: number;

    /**
     * The height of the asset on the source image
     */
    height: number;
}