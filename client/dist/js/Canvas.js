"use strict";
exports.__esModule = true;
exports.context = exports.canvas = void 0;
exports.canvas = document.querySelector('canvas');
exports.context = exports.canvas.getContext('2d');
exports.canvas.width = 1024;
exports.canvas.height = 576;
exports.context.fillRect(0, 0, exports.canvas.width, exports.canvas.height);
