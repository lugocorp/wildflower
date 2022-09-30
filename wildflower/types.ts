
export enum EventType {
    MouseEvent,
    KeyEvent
}

export interface Event {
    event: EventType;
    type: MouseEvent | KeyEvent;
    key: string;
    x: number;
    y: number;
}

export enum MouseEvent {
    MOVE,
    DOWN,
    UP
}

export enum KeyEvent {
    DOWN,
    UP
}