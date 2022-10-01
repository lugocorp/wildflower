import { Game, View, ImageAsset } from 'wildflower';

export default class HelloView extends View {
    private logo: ImageAsset;

    async handleStart(): Promise<void> {
        // Load an image asset, then redraw the view
        this.logo = await Game.instance.assets.registerImage('logo', 'assets/logo.svg');
        Game.instance.frame();
    }

    // Override this function for your drawing logic
    handleFrame(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.font = '15px sans-serif';
        ctx.fillText('Hello, world!', 10, 100);
        if (this.logo) {
            Game.instance.assets.draw(ctx, this.logo, 25, 25, 50, 50);
        }
    }
}