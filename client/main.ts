import gsap from "gsap";

import { GameObject } from "./GameObject";
import { Fighter } from "./Fighter";
import { canvas, context } from "./Canvas";
import { SpriteAction } from "./Sprites";
import { rectangularCollision, determineWinner, decreaseTimer, timerId } from "./Utils";

const background = new GameObject({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
});

const shop = new GameObject({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
});

const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    //   offset: {
    //     x: 0,
    //     y: 0
    //   },
    imageSrc: './assets/samuraiMack/SamuraiMackSpritesheet.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: new SpriteAction('./assets/samuraiMack/Idle.png', 8),
        run: new SpriteAction('./assets/samuraiMack/Run.png', 8),
        jump: new SpriteAction('./assets/samuraiMack/Jump.png', 2),
        fall: new SpriteAction('./assets/samuraiMack/Fall.png', 2),
        attack1: new SpriteAction('./assets/samuraiMack/Attack1.png', 6),
        takeHit: new SpriteAction('./assets/samuraiMack/TakeHit-WhiteSilhouette.png', 4),
        death: new SpriteAction('./assets/samuraiMack/Death.png', 6)
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    },
    imageWidth: 200,
    imageHeight: 200
});

const player2 = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    //   offset: {
    //     x: -50,
    //     y: 0
    //   },
    imageSrc: './assets/kenji/KenjiSpritesheet.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: new SpriteAction('./assets/kenji/Idle.png', 4),
        run: new SpriteAction('./assets/kenji/Run.png', 8),
        jump: new SpriteAction('./assets/kenji/Jump.png', 2),
        fall: new SpriteAction('./assets/kenji/Fall.png', 2),
        attack1: new SpriteAction('./assets/kenji/Attack1.png', 4),
        takeHit: new SpriteAction('./assets/kenji/TakeHit.png', 3),
        death: new SpriteAction('./assets/kenji/Death.png', 7)
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    },
    imageWidth: 200,
    imageHeight: 200
});


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer(player1, player2);

function animate()
{
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    context.fillStyle = 'rgba(255, 255, 255, 0.15)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    // player1 movement
    if (keys.a.pressed && player1.lastKey === 'a')
    {
        player1.velocity.x = -5;
        player1.switchSprite('run');
    }
    else if (keys.d.pressed && player1.lastKey === 'd')
    {
        player1.velocity.x = 5;
        player1.switchSprite('run');
    }
    else
    {
        player1.switchSprite('idle');
    }

    // jumping
    if (player1.velocity.y < 0)
    {
        player1.switchSprite('jump');
    }
    else if (player1.velocity.y > 0)
    {
        player1.switchSprite('fall');
    }

    // player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft')
    {
        player2.velocity.x = -5;
        player2.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight')
    {
        player2.velocity.x = 5;
        player2.switchSprite('run');
    }
    else
    {
        player2.switchSprite('idle');
    }

    // jumping
    if (player2.velocity.y < 0)
    {
        player2.switchSprite('jump');
    }
    else if (player2.velocity.y > 0)
    {
        player2.switchSprite('fall');
    }

    // detect for collision & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) &&
        player1.isAttacking &&
        player1.framesCurrent === 4
    )
    {
        player2.takeHit();
        player1.isAttacking = false;

        gsap.to('#enemyHealth', {
            width: player2.health + '%'
        });
    }

    // if player misses
    if (player1.isAttacking && player1.framesCurrent === 4)
    {
        player1.isAttacking = false;
    }

    // this is where our player gets hit
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
        }) &&
        player2.isAttacking &&
        player2.framesCurrent === 2
    )
    {
        player1.takeHit();
        player2.isAttacking = false;

        gsap.to('#playerHealth', {
            width: player1.health + '%'
        });
    }

    // if player misses
    if (player2.isAttacking && player2.framesCurrent === 2)
    {
        player2.isAttacking = false;
    }

    // end game based on health
    if (player2.health <= 0 || player1.health <= 0)
    {
        determineWinner({ player1, player2, timerId });
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player1.dead)
    {
        switch (event.key)
        {
            case 'd':
                keys.d.pressed = true;
                player1.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player1.lastKey = 'a';
                break;
            case 'w':
                player1.velocity.y = -20;
                break;
            case 's':
                player1.attack();
                break;
        }
    }

    if (!player2.dead)
    {
        switch (event.key)
        {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                player2.velocity.y = -20;
                break;
            case 'ArrowDown':
                player2.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key)
    {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    // enemy keys
    switch (event.key)
    {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
