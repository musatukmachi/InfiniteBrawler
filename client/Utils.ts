import { Fighter } from "./Fighter"

export function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

export function determineWinner({ player1, player2, timerId }) {
    clearTimeout(timerId)
    document.getElementById('displayText').style.display = 'flex'
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

var timer = 60;
export var timerId;
export function decreaseTimer(player1: Fighter, player2: Fighter) {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = new Number(timer).toString();
    }

    if (timer === 0) {
        determineWinner({ player1, player2, timerId })
    }
}
