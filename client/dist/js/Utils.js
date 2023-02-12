"use strict";
exports.__esModule = true;
exports.decreaseTimer = exports.timerId = exports.determineWinner = exports.rectangularCollision = void 0;
function rectangularCollision(_a) {
    var rectangle1 = _a.rectangle1, rectangle2 = _a.rectangle2;
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
            rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
            rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}
exports.rectangularCollision = rectangularCollision;
function determineWinner(_a) {
    var player1 = _a.player1, player2 = _a.player2, timerId = _a.timerId;
    clearTimeout(timerId);
    document.getElementById('displayText').style.display = 'flex';
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    }
    else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    }
    else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}
exports.determineWinner = determineWinner;
var timer = 60;
function decreaseTimer(player1, player2) {
    if (timer > 0) {
        exports.timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = new Number(timer).toString();
    }
    if (timer === 0) {
        determineWinner({ player1: player1, player2: player2, timerId: exports.timerId });
    }
}
exports.decreaseTimer = decreaseTimer;
