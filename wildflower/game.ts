import { MouseType, KeyType } from './types';
import AssetsManager from './assets';
import View from './view';

export default class Game {
    private static _game: Game;
    readonly assets = new AssetsManager();
    private _ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private future: NodeJS.Timeout;
    private lastFrame: number;
    private view: View;
    private scale = 1;

    /**
     * This function grabs the singleton instance of the `Game` class.
     */
    static get instance(): Game {
        return Game._game;
    }

    /**
     * This function acts as the factory for the game class.
     * You must use this instead of the constructor to create a new instance of `Game`.
     */
    static initialize(canvas: HTMLCanvasElement, view: View): Game {
        if (Game._game) {
            throw new Error('A game has already been initialized');
        }
        const game: Game = new Game(canvas);
        Game._game = game;
        game.setView(view);
        return game;
    }

    private constructor(canvas: HTMLCanvasElement) {
        const that = this;
        this.canvas = canvas;
        this._ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const registerMouseType = (type: MouseType, event: string): void => canvas.addEventListener(event, (e: MouseEvent) => {
            const coords: [number, number] = that.transformCoords(e.clientX, e.clientY);
            that.view.handleMouse(type, coords[0], coords[1]);
        });
        const registerKeyType = (type: KeyType, event: string): void => canvas.addEventListener(event, (e: KeyboardEvent) => {
            that.view.handleKey(type, e.key);
        });
        registerMouseType(MouseType.MOVE, 'mousemove');
        registerMouseType(MouseType.DOWN, 'mousedown');
        registerMouseType(MouseType.UP, 'mouseup');
        registerKeyType(KeyType.DOWN, 'keydown');
        registerKeyType(KeyType.UP, 'keyup');
    }

    /**
     * This function provides read-only access to the game's 2D context object.
     * This object is used for drawing on the HTML5 canvas view.
     */
    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    /**
     * This function converts user input coordinates into developer-defined internal coordinates.
     * It is used internally so developers won't have to handle scaling user clicks to the canvas.
     */
    private transformCoords(x: number, y: number): [number, number] {
        const rect = this.canvas.getBoundingClientRect();
        return [
            (x - rect.left) / this.scale,
            (y - rect.top) / this.scale
        ];
    }

    /**
     * This function sets the game's current view and runs its start logic (as defined by its `handleStart()` method).
     */
    setView(view: View): void {
        this.view = view;
        view.handleStart();
    }

    /**
     * This function runs the frame logic for your current view (as defined by its `handleFrame()` method).
     */
    frame(): Game {
        const now: number = new Date().getTime();
        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        const inverse = 1 / this.scale;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(this.scale, this.scale);
        try {
            this.view.handleFrame(this._ctx, (now - this.lastFrame) / 1000);
        } catch (err) {
            this.ctx.scale(inverse, inverse);
            this.lastFrame = now;
            throw err;
        }
        this.ctx.scale(inverse, inverse);
        this.lastFrame = now;
        return this;
    }

    /**
     * This function begins a game loop with a defined interval in between frames (defined in milliseconds).
     * It throws an error if a game loop is already active.
     */
    loop(interval = 100): Game {
        if (this.future) {
            throw new Error('Game loop is already ongoing');
        }
        const that = this;
        this.future = setTimeout(function () {
            that.future = undefined;
            that.loop();
        }, interval);
        return this.frame();
    }

    /**
     * This function stops any actively running game loops, or throws an error if none were active.
     */
    stop(): Game {
        if (!this.future) {
            throw new Error('No ongoing game loop to stop');
        }
        clearTimeout(this.future);
        return this;
    }

    /**
     * This function resizes the canvas to fill the screen while also maintaining a developer-defined coordinate system.
     */
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