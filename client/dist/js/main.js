"use strict";
exports.__esModule = true;
var gsap_1 = require("gsap");
var GameObject_1 = require("./GameObject");
var Fighter_1 = require("./Fighter");
var Canvas_1 = require("./Canvas");
var Sprites_1 = require("./Sprites");
var Utils_1 = require("./Utils");
var background = new GameObject_1.GameObject({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
});
var shop = new GameObject_1.GameObject({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
});
var player1 = new Fighter_1.Fighter({
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
        idle: new Sprites_1.SpriteAction('./assets/samuraiMack/Idle.png', 8),
        run: new Sprites_1.SpriteAction('./assets/samuraiMack/Run.png', 8),
        jump: new Sprites_1.SpriteAction('./assets/samuraiMack/Jump.png', 2),
        fall: new Sprites_1.SpriteAction('./assets/samuraiMack/Fall.png', 2),
        attack1: new Sprites_1.SpriteAction('./assets/samuraiMack/Attack1.png', 6),
        takeHit: new Sprites_1.SpriteAction('./assets/samuraiMack/TakeHit-WhiteSilhouette.png', 4),
        death: new Sprites_1.SpriteAction('./assets/samuraiMack/Death.png', 6)
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
var player2 = new Fighter_1.Fighter({
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
        idle: new Sprites_1.SpriteAction('./assets/kenji/Idle.png', 4),
        run: new Sprites_1.SpriteAction('./assets/kenji/Run.png', 8),
        jump: new Sprites_1.SpriteAction('./assets/kenji/Jump.png', 2),
        fall: new Sprites_1.SpriteAction('./assets/kenji/Fall.png', 2),
        attack1: new Sprites_1.SpriteAction('./assets/kenji/Attack1.png', 4),
        takeHit: new Sprites_1.SpriteAction('./assets/kenji/TakeHit.png', 3),
        death: new Sprites_1.SpriteAction('./assets/kenji/Death.png', 7)
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
var keys = {
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
};
(0, Utils_1.decreaseTimer)(player1, player2);
function animate() {
    window.requestAnimationFrame(animate);
    Canvas_1.context.fillStyle = 'black';
    Canvas_1.context.fillRect(0, 0, Canvas_1.canvas.width, Canvas_1.canvas.height);
    background.update();
    shop.update();
    Canvas_1.context.fillStyle = 'rgba(255, 255, 255, 0.15)';
    Canvas_1.context.fillRect(0, 0, Canvas_1.canvas.width, Canvas_1.canvas.height);
    player1.update();
    player2.update();
    player1.velocity.x = 0;
    player2.velocity.x = 0;
    // player1 movement
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5;
        player1.switchSprite('run');
    }
    else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
        player1.switchSprite('run');
    }
    else {
        player1.switchSprite('idle');
    }
    // jumping
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump');
    }
    else if (player1.velocity.y > 0) {
        player1.switchSprite('fall');
    }
    // player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
        player2.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
        player2.switchSprite('run');
    }
    else {
        player2.switchSprite('idle');
    }
    // jumping
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump');
    }
    else if (player2.velocity.y > 0) {
        player2.switchSprite('fall');
    }
    // detect for collision & enemy gets hit
    if ((0, Utils_1.rectangularCollision)({
        rectangle1: player1,
        rectangle2: player2
    }) &&
        player1.isAttacking &&
        player1.framesCurrent === 4) {
        player2.takeHit();
        player1.isAttacking = false;
        gsap_1["default"].to('#enemyHealth', {
            width: player2.health + '%'
        });
    }
    // if player misses
    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false;
    }
    // this is where our player gets hit
    if ((0, Utils_1.rectangularCollision)({
        rectangle1: player2,
        rectangle2: player1
    }) &&
        player2.isAttacking &&
        player2.framesCurrent === 2) {
        player1.takeHit();
        player2.isAttacking = false;
        gsap_1["default"].to('#playerHealth', {
            width: player1.health + '%'
        });
    }
    // if player misses
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false;
    }
    // end game based on health
    if (player2.health <= 0 || player1.health <= 0) {
        (0, Utils_1.determineWinner)({ player1: player1, player2: player2, timerId: Utils_1.timerId });
    }
}
animate();
window.addEventListener('keydown', function (event) {
    if (!player1.dead) {
        switch (event.key) {
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
    if (!player2.dead) {
        switch (event.key) {
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
window.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
