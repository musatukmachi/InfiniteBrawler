"use strict";
exports.__esModule = true;
exports.SpriteAction = exports.Sprites = void 0;
var Sprites = /** @class */ (function () {
    function Sprites() {
    }
    return Sprites;
}());
exports.Sprites = Sprites;
var SpriteAction = /** @class */ (function () {
    function SpriteAction(imageSrc, framesMax) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
    }
    return SpriteAction;
}());
exports.SpriteAction = SpriteAction;
