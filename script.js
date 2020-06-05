'use strict';

const playerFactory = (name, piece) => {
    return { name, piece };
};

const game = {
    grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    whosTurn: 'player1',
    keepGoing: true,
    whoHasWon: null,
    player1: playerFactory('player 1', '❌'),
    player2: playerFactory('player 2', '⭕'),

    hasSomeoneWon: function (x, y) {
        if (this.grid[x][0] === this.grid[x][1] && this.grid[x][0] === this.grid[x][2]) {
            return true;
        }
        if (this.grid[0][y] === this.grid[1][y] && this.grid[0][y] === this.grid[2][y]) {
            return true;
        }
        if (this.grid[1][1] !== '') {
            if ((this.grid[1][1] === this.grid[0][0] && this.grid[1][1] === this.grid[2][2]) || (this.grid[1][1] === this.grid[0][2] && this.grid[1][1] === this.grid[2][0])) {
                return true;
            }
        }
        return false;
    },

    isItDraw: function () {
        let spaceCount = 0;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (this.grid[i][j] === '') {
                    spaceCount++;
                }
            }
        }
        return spaceCount === 0;
    },

    endGame: function (winner) {
        this.keepGoing = false;
        this.whoHasWon = winner;
    },

    playTurn: function (x, y) {
        if (this.grid[x][y] !== '') {
            return;
        }
        this.grid[x][y] = this[this.whosTurn].piece;
        if (this.hasSomeoneWon(x, y)) {
            this.endGame(this.whosTurn);
        } else if (this.isItDraw()) {
            this.endGame('nobody');
        }
        if (this.whosTurn === 'player1') {
            this.whosTurn = 'player2';
        } else {
            this.whosTurn = 'player1';
        }
        this.render();
    },

    restart: function () {
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.whosTurn =  'player1';
        this.keepGoing =  true;
        this.whoHasWon =  null;
        this.render();
    },

    render: function () {
        document.getElementById('main').innerHTML = '';
        document.getElementById('results').innerHTML = '';
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const square = document.createElement('div');
                square.style.height = "50px";
                square.style.width = "50px";
                square.style.backgroundColor = "grey";
                if (this.keepGoing) {
                    square.addEventListener("click", () => this.playTurn(i, j))
                }
                square.textContent = this.grid[i][j];
                document.getElementById('main').appendChild(square);
            }
        }
        if (!this.keepGoing) {
            const div = document.createElement('div');
            div.textContent = this.whoHasWon + ' has won';
            document.getElementById('results').appendChild(div);
            const button = document.createElement('button');
            button.textContent = 'New Game';
            button.addEventListener('click', () => this.restart());
            document.getElementById('results').appendChild(button);
        }
    },


}

game.render()

