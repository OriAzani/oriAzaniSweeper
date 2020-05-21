var gBoard = [];
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var BOMB = '&#128163';
var FLAG = '&#9873;'
var BULB = '&#128161'
var gSmiley = '&#128512'

var gIsGameOn = false;
var gLives = 3;
var gSafe = 3;
var gMarked = 0;
var gHints = 3;
var gShownElements = 0;
var gIsHint = false;
var elLives = document.getElementById("lives");
var elSafe = document.getElementById("btn");


function init() {
    stop()
    gLives = 3;
    gSafe = 3;
    hints = 3;
    gIsGameOn = false;
    appendTens.innerText = '00'
    appendSeconds.innerText = '00'
    gBoard = [];
    gSmiley = '&#128512'
    elLives.innerText = gLives
    elSafe.innerText = gSafe
    var elWin = document.querySelector('.win')
    elWin.style.display = 'none';
    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'none'
    buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i].push({ minesAroundCount: 0, isShown: false, isMine: false, isMarked: false, isSafe: false, })
        }
    }
}

function renderBoard(board) {
    var strHtml = '<table>'; 
    if (gHints === 3) { strHtml += `<tr onmouseover="" style="cursor: pointer;"><th onclick="hintClicked()" colspan=${gLevel.SIZE}>${BULB}${BULB}${BULB}</th></tr>` }
    if (gHints === 2) { strHtml += `<tr onmouseover="" style="cursor: pointer;"><th onclick="hintClicked()" colspan=${gLevel.SIZE}>${BULB}${BULB}</th></tr>` }
    if (gHints === 1) { strHtml += `<tr onmouseover="" style="cursor: pointer;"><th onclick="hintClicked()" colspan=${gLevel.SIZE}>${BULB}</th></tr>` }

    strHtml += `<tr><th onmouseover="" style="cursor: pointer;" onclick="init()" colspan=${gLevel.SIZE}>${gSmiley}</th></tr>`
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine === true && board[i][j].isShown === true) {
                strHtml += `<td class="shown-bomb" id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${BOMB}</td>`
            }
            else if (board[i][j].isMarked === true) {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${FLAG}</td>`
            } else if ((board[i][j].isShown === true) && (board[i][j].minesAroundCount > 0)) {
                strHtml += `<td class="clicked" id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)">${gBoard[i][j].minesAroundCount}</td>`
            } else if ((board[i][j].isShown === true) && (board[i][j].minesAroundCount === 0)) {
                strHtml += `<td class="clicked" id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)"></td>`
            } else if (board[i][j].isSafe === true) {
                strHtml += `<td class="safe" id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)"></td>`
            } else {
                strHtml += `<td id="${i + ',' + j}" onmousedown="cellClicked(this.id , event)"></td>`
            }
        }
    }
    strHtml += '</table>'
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml;
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
    init()
}