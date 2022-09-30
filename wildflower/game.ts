import View from './view';

export default class Game {
    private static _game: Game;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private view: View;
    scale = 1;

    static initialize(canvas: HTMLCanvasElement): Game {
        if (Game._game) {
            throw new Error('A game has already been initialized');
        }
        Game._game = new Game(canvas);
        return Game._game;
    }

    static get instance(): Game {
        return Game._game;
    }

    private constructor(canvas: HTMLCanvasElement) {
        const that = this;
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const registerMouseEvent = (type: MouseEvent, event: string): void => canvas.addEventListener(event, (e) => {
            const coords: [number, number] = that.transformCoords(e.clientX, e.clientY);
            that.view.handleMouse(type, coords[0], coords[1]);
        });
        const registerKeyEvent = (type: KeyEvent, event: string): void => canvas.addEventListener(event, (e) => {
            that.view.handleKey(type, e.key);
        });
        registerMouseEvent(MouseEvent.MOVE, 'mousemove');
        registerMouseEvent(MouseEvent.DOWN, 'mousedown');
        registerMouseEvent(MouseEvent.UP, 'mouseup');
        registerKeyEvent(KeyEvent.DOWN, 'keydown');
        registerKeyEvent(KeyEvent.UP, 'keyup');
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    setView(view: View): void {
        this.view = view;
        view.handleStart();
    }

    transformCoords(x: number, y: number): [number, number] {
        const rect = canvas.getBoundingClientRect();
        return [
            (x - rect.left) / this.scale,
            (y - rect.top) / this.scale
        ];
    }

    resize(width = window.innerWidth, height = window.innerHeight): Game {
        const screenHeight: number = window.innerHeight;
        const screenWidth: number = window.innerWidth;
        this.scale = screenHeight / height;
        if (screenWidth / width < this.scale) {
            this.scale = screenWidth / width;
        }
        this.scale = Math.round(this.scale * 1000) / 1000;
        this.canvas.height = this.scale * height;
        this.canvas.width = this.scale * width;
        return this;
    }
}