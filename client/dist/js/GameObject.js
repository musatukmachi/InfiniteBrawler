"use strict";
exports.__esModule = true;
exports.GameObject = void 0;
var Components_1 = require("./Components");
var Canvas_1 = require("./Canvas");
var GameObject = /** @class */ (function () {
    function GameObject(_a) {
        var position = _a.position, imageSrc = _a.imageSrc, _b = _a.scale, scale = _b === void 0 ? 1 : _b, _c = _a.framesMax, framesMax = _c === void 0 ? 1 : _c, _d = _a.offset, offset = _d === void 0 ? { x: 0, y: 0 } : _d, _e = _a.imageWidth, imageWidth = _e === void 0 ? null : _e, _f = _a.imageHeight, imageHeight = _f === void 0 ? null : _f;
        this.position = new Components_1.Position();
        this.spritesheetRow = 1;
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
        if (!imageWidth)
            this.imageWidth = this.image.width / this.framesMax;
        else
            this.imageWidth = imageWidth;
        if (!imageHeight)
            this.imageHeight = this.image.height;
        else
            this.imageHeight = imageHeight;
    }
    GameObject.prototype.draw = function () {
        Canvas_1.context.drawImage(this.image, 
        // this.framesCurrent * (this.image.width / this.framesMax),
        this.framesCurrent * this.imageWidth, 
        // 0,
        200 * (this.spritesheetRow - 1), 
        // this.image.width / this.framesMax,
        // this.image.height,
        this.imageWidth, this.imageHeight, this.position.x - this.offset.x, this.position.y - this.offset.y, 
        // (this.image.width / this.framesMax) * this.scale,
        // this.image.height * this.scale
        this.imageWidth * this.scale, this.imageHeight * this.scale);
    };
    GameObject.prototype.animateFrames = function () {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            }
            else {
                this.framesCurrent = 0;
            }
        }
    };
    GameObject.prototype.update = function () {
        this.draw();
        this.animateFrames();
    };
    return GameObject;
}());
exports.GameObject = GameObject;
