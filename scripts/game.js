
game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4']
}

const newGame = () => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

function showScore() {
    document.getElementById('score').innerText = game.score;
}

const addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 4000)
}

module.exports = { game, newGame, addTurn, lightsOn };
