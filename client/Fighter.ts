import { GameObject } from "./GameObject";
import { Velocity, AttackBox, Offset } from "./Components";
import { Sprites } from "./Sprites";
import { canvas } from "./Canvas";
import { gravity } from "./Constants";
import { SpriteRow } from "./SpriteToSheetRow";

export class Fighter extends GameObject
{
    public velocity: Velocity;
    public lastKey: string;
    public attackBox: AttackBox = { offset: new Offset(), width: undefined, height: undefined };
    public color: string;
    public isAttacking: boolean;
    public health: number;
    public sprites: Sprites;
    public dead: boolean;

    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox,
        imageWidth,
        imageHeight
    })
    {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            imageWidth,
            imageHeight
        })

        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.color = color;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;
    }

    update() {
        this.draw();
        if (!this.dead) this.animateFrames();

        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // draw the attack box
        // c.fillRect(
        //   this.attackBox.position.x,
        //   this.attackBox.position.y,
        //   this.attackBox.width,
        //   this.attackBox.height
        // )

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96)
        {
            this.velocity.y = 0;
            this.position.y = 330;
        }
        else
        {
            this.velocity.y += gravity;
        }
    }

    attack()
    {
        this.switchSprite('attack1');
        this.isAttacking = true;
    }

    takeHit()
    {
        this.health -= 20;

        if (this.health <= 0)
        {
            this.switchSprite('death')
        }
        else
        {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite)
    {
        // if (this.image === this.sprites.death.image)
        if (this.spritesheetRow === SpriteRow.DEATH)
        {
            if (this.framesCurrent === this.sprites.death.framesMax - 1)
            {
                this.dead = true;
            }
            return;
        }

        // overriding all other animations with the attack animation
        // if (
        //     this.image === this.sprites.attack1.image &&
        //     this.framesCurrent < this.sprites.attack1.framesMax - 1
        // )
        if (this.spritesheetRow === SpriteRow.ATTACK && this.framesCurrent < this.sprites.attack1.framesMax - 1)
        {
            return;
        }

        // override when fighter gets hit
        // if (
        //     this.image === this.sprites.takeHit.image &&
        //     this.framesCurrent < this.sprites.takeHit.framesMax - 1
        // )
        if (
            this.spritesheetRow === SpriteRow.TAKEHIT &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        )
        {
            return;
        }

        switch (sprite)
        {
            case 'idle':
                // if (this.image !== this.sprites.idle.image) {
                    // this.image = this.sprites.idle.image
                    this.spritesheetRow = SpriteRow.IDLE;
                    this.framesMax = this.sprites.idle.framesMax
                    // this.framesCurrent = 0
                // }
                break;
            case 'run':
                // if (this.image !== this.sprites.run.image) {
                    // this.image = this.sprites.run.image
                    this.spritesheetRow = SpriteRow.RUN;
                    this.framesMax = this.sprites.run.framesMax;
                    // this.framesCurrent = 0;
                // }
                break;
            case 'jump':
                // if (this.image !== this.sprites.jump.image) {
                    // this.image = this.sprites.jump.image
                    this.spritesheetRow = SpriteRow.JUMP;
                    this.framesMax = this.sprites.jump.framesMax;
                    // this.framesCurrent = 0;
                // }
                break;
            case 'fall':
                // if (this.image !== this.sprites.fall.image) {
                    // this.image = this.sprites.fall.image
                    this.spritesheetRow = SpriteRow.FALL;
                    this.framesMax = this.sprites.fall.framesMax;
                    // this.framesCurrent = 0;
                // }
                break;
            case 'attack1':
                // if (this.image !== this.sprites.attack1.image) {
                    // this.image = this.sprites.attack1.image
                    this.spritesheetRow = SpriteRow.ATTACK;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                // }
                break;

            case 'takeHit':
                // if (this.image !== this.sprites.takeHit.image) {
                    // this.image = this.sprites.takeHit.image
                    this.spritesheetRow = SpriteRow.TAKEHIT;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                // }
                break;
            case 'death':
                // if (this.image !== this.sprites.death.image) {
                    // this.image = this.sprites.death.image
                    this.spritesheetRow = SpriteRow.DEATH;
                    this.framesMax = this.sprites.death.framesMax;
                    // this.framesCurrent = 0;
                // }
                break;
        }
    }
}
