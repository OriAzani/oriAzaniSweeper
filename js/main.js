var gBoard = [];
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var BOMB = '&#128163';
var FLAG = '&#9873;'
var isGameOn = false;
var gFirstClickI = -1;
var gFirstClickJ = -1;
var lives = 3;
var elLives = document.getElementById("lives");
var elSafe = document.getElementById("btn");
var gMarked = 0;
var gShownElements = 0;

var happySmiley = '&#128512'
var coolSmiley = '&#128526'
var blownSmiley = '&#128565'

function init() {
    buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
}

function buildBoard() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i].push({ minesAroundCount: 0, isShown: false, isMine: false, isMarked: false, isSafe: false, })
        }
    }
    console.log(gBoard)
}



function renderBoard(board) {

    var strHtml = '<table>';
    strHtml += `<tr><th>${happySmiley}</th></tr>`
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine === true && board[i][j].isShown === true) {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${BOMB}</td>`
            }
            else if (board[i][j].isMarked === true) {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${FLAG}</td>`
            } else if (board[i][j].isShown === true) {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${gBoard[i][j].minesAroundCount}</td>`
            } else if (board[i][j].isSafe === true) {
                strHtml += `<td class="safe" id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)"></td>`
            } else {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)"></td>`
            }
        }
    }
    strHtml += '</table>'
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml

}


function setLevel(num) {
    if (num === 4) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
    }
    if (num === 8) {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
    }
    if (num === 12) {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
    }
    buildBoard()
    renderBoard(gBoard)
}