"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Fighter = void 0;
var GameObject_1 = require("./GameObject");
var Components_1 = require("./Components");
var Canvas_1 = require("./Canvas");
var Constants_1 = require("./Constants");
var SpriteToSheetRow_1 = require("./SpriteToSheetRow");
var Fighter = /** @class */ (function (_super) {
    __extends(Fighter, _super);
    function Fighter(_a) {
        var position = _a.position, velocity = _a.velocity, _b = _a.color, color = _b === void 0 ? 'red' : _b, imageSrc = _a.imageSrc, _c = _a.scale, scale = _c === void 0 ? 1 : _c, _d = _a.framesMax, framesMax = _d === void 0 ? 1 : _d, _e = _a.offset, offset = _e === void 0 ? { x: 0, y: 0 } : _e, sprites = _a.sprites, attackBox = _a.attackBox, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight;
        var _this = _super.call(this, {
            position: position,
            imageSrc: imageSrc,
            scale: scale,
            framesMax: framesMax,
            offset: offset,
            imageWidth: imageWidth,
            imageHeight: imageHeight
        }) || this;
        _this.attackBox = { offset: new Components_1.Offset(), width: undefined, height: undefined };
        _this.velocity = velocity;
        _this.width = 50;
        _this.height = 150;
        _this.attackBox = {
            position: {
                x: _this.position.x,
                y: _this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        _this.color = color;
        _this.health = 100;
        _this.framesCurrent = 0;
        _this.framesElapsed = 0;
        _this.framesHold = 5;
        _this.sprites = sprites;
        _this.dead = false;
        return _this;
    }
    Fighter.prototype.update = function () {
        this.draw();
        if (!this.dead)
            this.animateFrames();
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
        if (this.position.y + this.height + this.velocity.y >= Canvas_1.canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        }
        else {
            this.velocity.y += Constants_1.gravity;
        }
    };
    Fighter.prototype.attack = function () {
        this.switchSprite('attack1');
        this.isAttacking = true;
    };
    Fighter.prototype.takeHit = function () {
        this.health -= 20;
        if (this.health <= 0) {
            this.switchSprite('death');
        }
        else {
            this.switchSprite('takeHit');
        }
    };
    Fighter.prototype.switchSprite = function (sprite) {
        // if (this.image === this.sprites.death.image)
        if (this.spritesheetRow === SpriteToSheetRow_1.SpriteRow.DEATH) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true;
            }
            return;
        }
        // overriding all other animations with the attack animation
        // if (
        //     this.image === this.sprites.attack1.image &&
        //     this.framesCurrent < this.sprites.attack1.framesMax - 1
        // )
        if (this.spritesheetRow === SpriteToSheetRow_1.SpriteRow.ATTACK && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
            return;
        }
        // override when fighter gets hit
        // if (
        //     this.image === this.sprites.takeHit.image &&
        //     this.framesCurrent < this.sprites.takeHit.framesMax - 1
        // )
        if (this.spritesheetRow === SpriteToSheetRow_1.SpriteRow.TAKEHIT &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1) {
            return;
        }
        switch (sprite) {
            case 'idle':
                // if (this.image !== this.sprites.idle.image) {
                // this.image = this.sprites.idle.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.IDLE;
                this.framesMax = this.sprites.idle.framesMax;
                // this.framesCurrent = 0
                // }
                break;
            case 'run':
                // if (this.image !== this.sprites.run.image) {
                // this.image = this.sprites.run.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.RUN;
                this.framesMax = this.sprites.run.framesMax;
                // this.framesCurrent = 0;
                // }
                break;
            case 'jump':
                // if (this.image !== this.sprites.jump.image) {
                // this.image = this.sprites.jump.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.JUMP;
                this.framesMax = this.sprites.jump.framesMax;
                // this.framesCurrent = 0;
                // }
                break;
            case 'fall':
                // if (this.image !== this.sprites.fall.image) {
                // this.image = this.sprites.fall.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.FALL;
                this.framesMax = this.sprites.fall.framesMax;
                // this.framesCurrent = 0;
                // }
                break;
            case 'attack1':
                // if (this.image !== this.sprites.attack1.image) {
                // this.image = this.sprites.attack1.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.ATTACK;
                this.framesMax = this.sprites.attack1.framesMax;
                this.framesCurrent = 0;
                // }
                break;
            case 'takeHit':
                // if (this.image !== this.sprites.takeHit.image) {
                // this.image = this.sprites.takeHit.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.TAKEHIT;
                this.framesMax = this.sprites.takeHit.framesMax;
                this.framesCurrent = 0;
                // }
                break;
            case 'death':
                // if (this.image !== this.sprites.death.image) {
                // this.image = this.sprites.death.image
                this.spritesheetRow = SpriteToSheetRow_1.SpriteRow.DEATH;
                this.framesMax = this.sprites.death.framesMax;
                // this.framesCurrent = 0;
                // }
                break;
        }
    };
    return Fighter;
}(GameObject_1.GameObject));
exports.Fighter = Fighter;
