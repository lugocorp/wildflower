import { View } from '../wildflower';

export default class HelloView extends View {

    handleDraw(ctx: CanvasRenderingContext2D): void {
        ctx.font = '25px sans-serif';
        ctx.fillText('Hello, world!', 5, 30);
    }
}