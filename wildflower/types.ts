
export enum MouseType {
    MOVE,
    DOWN,
    UP
}

export enum KeyType {
    DOWN,
    UP
}

export interface ImageAsset {
    element: HTMLImageElement;
    left: number;
    top: number;
    width: number;
    height: number;
}