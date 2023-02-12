import { Position, Offset } from "./Components";
import { context } from "./Canvas";

export class GameObject
{
    public position = new Position();
    public width: number;
    public height: number;
    public image;
    public imageWidth: number;
    public imageHeight: number;
    public scale: number;
    public framesMax: number;
    public framesCurrent: number;
    public framesElapsed: number;
    public framesHold: number;
    public offset: Offset;
    public spritesheetRow = 1;

    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        imageWidth = null,
        imageHeight = null
    })
    {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
        if(!imageWidth) this.imageWidth = this.image.width / this.framesMax;
        else this.imageWidth = imageWidth;
        if(!imageHeight) this.imageHeight = this.image.height;
        else this.imageHeight = imageHeight;
    }

    draw()
    {
        context.drawImage(
            this.image,
            // this.framesCurrent * (this.image.width / this.framesMax),
            this.framesCurrent * this.imageWidth,
            // 0,
            200 * (this.spritesheetRow - 1),
            // this.image.width / this.framesMax,
            // this.image.height,
            this.imageWidth,
            this.imageHeight,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            // (this.image.width / this.framesMax) * this.scale,
            // this.image.height * this.scale
            this.imageWidth * this.scale,
            this.imageHeight * this.scale
        );
    }

    animateFrames()
    {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0)
        {
            if (this.framesCurrent < this.framesMax - 1)
            {
                this.framesCurrent++;
            }
            else
            {
                this.framesCurrent = 0;
            }
        }
    }

    update()
    {
        this.draw();
        this.animateFrames();
    }
}