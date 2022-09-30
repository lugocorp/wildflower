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
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
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