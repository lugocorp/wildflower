import { MouseType, KeyType } from './types';
import AssetsManager from './assets';
import View from './view';

export default class Game {
    private static _game: Game;
    readonly assets = new AssetsManager();
    private _ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private future: NodeJS.Timeout;
    private view: View;
    private scale = 1;

    static get instance(): Game {
        return Game._game;
    }

    static initialize(canvas: HTMLCanvasElement, view: View): Game {
        if (Game._game) {
            throw new Error('A game has already been initialized');
        }
        const game: Game = new Game(canvas, view);
        Game._game = game;
        game.setView(view);
        return game;
    }

    private constructor(canvas: HTMLCanvasElement, view: View) {
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

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    private transformCoords(x: number, y: number): [number, number] {
        const rect = this.canvas.getBoundingClientRect();
        return [
            (x - rect.left) / this.scale,
            (y - rect.top) / this.scale
        ];
    }

    setView(view: View): void {
        this.view = view;
        view.handleStart();
    }

    frame(): Game {
        const inverse = 1 / this.scale;
        this.ctx.scale(this.scale, this.scale);
        this.view.handleDraw(this._ctx);
        this.ctx.scale(inverse, inverse);
        return this;
    }

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

    stop(): Game {
        if (!this.future) {
            throw new Error('No ongoing game loop to stop');
        }
        clearTimeout(this.future);
        return this;
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