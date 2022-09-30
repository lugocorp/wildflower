import { Game, View, ImageAsset } from '../wildflower';

export default class HelloView extends View {
    private logo: ImageAsset;

    async handleStart(): Promise<void> {
        this.logo = await Game.instance.assets.registerImage('assets/lugocorp.svg');
        Game.instance.frame();
    }

    handleDraw(ctx: CanvasRenderingContext2D): void {
        ctx.font = '15px sans-serif';
        ctx.fillText('Hello, world!', 10, 100);
        if (this.logo) {
            Game.instance.assets.draw(ctx, this.logo, 25, 25, 50, 50);
        }
    }
}