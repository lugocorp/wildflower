import { MouseEvent, KeyEvent } from './types';

interface View {
    handleStart: () => void;
    handleMouse: (type: MouseEvent, x: number, y: number) => void;
    handleKey: (type: KeyEvent, key: string) => void;
    handleDraw: (ctx: CanvasRenderingContext2D) => void;
}

export default View;