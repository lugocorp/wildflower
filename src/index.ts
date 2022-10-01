import { Game } from 'wildflower';
import HelloView from './hello';

document.addEventListener('deviceready', async () => {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    Game.initialize(canvas, new HelloView()).resize(100, 175).frame();
}, false);

document.dispatchEvent(new Event('deviceready'));