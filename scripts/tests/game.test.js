/**
 * @jest-environment jsdom
 */

const { game, newGame, addTurn, lightsOn, showTurns, playerTurn } = require('../game')

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains corect keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true); 
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true); 
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true); 
    });
    test('turnInProgres key exists', () => {
        expect('turnInProgres' in game).toBe(true); 
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true); 
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true); 
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true); 
    });
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = [1, 3 ,2]
        game.currentGame = [4]
        document.getElementById('score').innerText = '42'
        newGame();
    });
    test('score should reset', () => {
        expect(game.score).toEqual(0);
    });
    test('playerMoves should reset', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('currentGame should have length 1', () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test('score should reset on the page', () => {
        expect(document.getElementById('score').innerText).toBe(0)
    });
    test('data listeners should set to true', () => {
        let elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn add a new turn', () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    test('should add correct class to light up the button', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');

    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the move is corect', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('expect a alert when wrong move', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!')
    });
    test('turnInProgres should be true while game runs', () => {
        showTurns();
        expect(game.turnInProgres).toBe(true);
    });
    test('clicking during computer turn should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');
    });
})