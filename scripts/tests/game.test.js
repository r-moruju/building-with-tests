/**
 * @jest-environment jsdom
 */

const { game, newGame, addTurn, lightsOn } = require('../game')

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
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true); 
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
    })
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

    })
})