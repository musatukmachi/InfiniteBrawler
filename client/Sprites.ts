
export class Sprites
{
    idle: SpriteAction;
    run: SpriteAction;
    jump: SpriteAction;
    fall: SpriteAction;
    attack1: SpriteAction;
    takeHit: SpriteAction;
    death: SpriteAction;
}

export class SpriteAction
{
    public image;
    public framesMax: number;

    constructor(imageSrc: string, framesMax: number)
    {
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
    }
    
}