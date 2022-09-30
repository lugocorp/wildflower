import { Game } from '../wildflower';

document.addEventListener('deviceready', async () => {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    Game.initialize(canvas).resize(100, 175);
}, false);