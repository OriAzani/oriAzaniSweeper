
//////////// cellClicked ////////////
function cellClicked(id, event) {
    var clicker = event.which;
    var idNums = id.split(',')
    for (var count = 0; count < idNums.length; count++) {
        idNums[count] = +idNums[count]
    }

    if (gIsHint === true) {
        hint(idNums)
        return;
    }

    if (gIsGameOn === false) {
        gIsGameOn = true
        start()
        gBoard[idNums[0]][idNums[1]].isShown = true;
        placeMines(idNums)
    }

    if (clicker === 3) {
        gBoard[idNums[0]][idNums[1]].isMarked = true;
        renderBoard(gBoard);
        return
    }

    if (clicker === 1) {
        if (gBoard[idNums[0]][idNums[1]].isMine === true) {
            gBoard[idNums[0]][idNums[1]].isShown = true;
           if (gLives !== 0 ) {
               gLives--
           }
            elLives.innerText = gLives;
            checkIfGameOver()
            renderBoard(gBoard);
        }

        if (gBoard[idNums[0]][idNums[1]].isSafe === true) {
            gBoard[idNums[0]][idNums[1]].isSafe = false;
            gBoard[idNums[0]][idNums[1]].isShown = true;
            renderBoard(gBoard)
        }

        if (gBoard[idNums[0]][idNums[1]].minesAroundCount == 0) {
            expand(idNums)
        }
        else {
            (gBoard[idNums[0]][idNums[1]].isShown = true)
            renderBoard(gBoard)
        }
    }
    checkIfWon()
}

function placeMines(idNums) {
    for (var minesOnBoard = 0; minesOnBoard < gLevel.MINES; minesOnBoard++) {
        var randI = getRandInt();
        var randJ = getRandInt();

        if (gBoard[randI][randJ].isShown === true) {
            minesOnBoard--
            continue;
        }
        if (gBoard[randI][randJ].isMine === true) {
            minesOnBoard--
            continue;
        } else {
            gBoard[randI][randJ].isMine = true;
        }
    }
    setMinesNegsCount()
    renderBoard(gBoard)
}

function setMinesNegsCount() {
    var negsCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            for (var cellI = i - 1; cellI <= i + 1; cellI++) {
                if (cellI < 0 || cellI >= gBoard[i].length) continue;
                for (var cellJ = j - 1; cellJ <= j + 1; cellJ++) {
                    if (cellJ < 0 || cellJ >= gBoard[cellI].length) continue;
                    if (cellI === i && cellJ === j) continue;

                    if (gBoard[cellI][cellJ].isMine === true) {
                        negsCount++
                    }
                }
                gBoard[i][j].minesAroundCount = negsCount;
            }
            negsCount = 0;
        }
    }
}

function getRandInt() {

    var randNum = Math.floor(Math.random() * (gLevel.SIZE));
    return randNum
};

//////////// Clock ////////////
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;
function start() {
    Interval = setInterval(startTimer, 10);
}
function stop() {
    clearInterval(Interval);
}
function startTimer() {
    tens++;
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

//////////// Safe Click ////////////
function safeClick() {
    gSafe--
    elSafe.innerText = gSafe;
    var coverdCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j];

            if ((currCell.isShown === false) && (currCell.isMine === false)) {
                coverdCells.push(i + ',' + j);
            }
        }
    }
    var randPick = getRandInt(coverdCells.length)
    coverdCells[randPick]
    var safeNums = coverdCells[randPick].split(',');
    gBoard[safeNums[0]][safeNums[1]].isSafe = true;
    renderBoard(gBoard)
}

function expand(idNums) {
    var i = idNums[0]
    var j = idNums[1]
    if (gBoard[i][j].isMine === true) return;

    for (var cellI = i - 1; cellI <= i + 1; cellI++) {
        if (cellI < 0 || cellI >= gBoard[i].length) continue;
        for (var cellJ = j - 1; cellJ <= j + 1; cellJ++) {
            if (cellJ < 0 || cellJ >= gBoard[cellI].length) continue;
            if (gBoard[cellI][cellJ].isMine !== true) {
                gBoard[cellI][cellJ].isShown = true;
            }
        }
    }
    renderBoard(gBoard)
}

function checkIfGameOver() {
    if (gLives === 0) {
        var elGameOver = document.querySelector('.game-over');
        elGameOver.style.display = 'block'

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                if (gBoard[i][j].isMine === true) {
                    gBoard[i][j].isShown = true;
                }
            }
        }
        gIsGameOn = false;
        stop()
        gSmiley = '&#128565'
    }
}

function checkIfWon() {
    gMarked = 0;
    gShownElements = 0;
    var totalCells = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            totalCells++
            if (gBoard[i][j].isShown === true) {
                gShownElements++
            }
            if (gBoard[i][j].isMarked === true) {
                gMarked++
            }
        }
    }
    if ((gMarked + gShownElements) >= totalCells) {
        stop()
        gSmiley = '&#128526'
        renderBoard(gBoard)
        gIsGameOn = false;
        var elWin = document.querySelector('.win')
        elWin.style.display = 'block';
    }
}

function hintClicked() {
    if (gIsGameOn === false) {
        alert("No Hints On first Move!");
        return;
    }
    if (gIsHint === false) {
        gIsHint = true;
    }
}

function hint(idNums) {
    gHints--
    gIsHint = false
    renderBoard(gBoard)

    var HintNums = [];
    var i = idNums[0]
    var j = idNums[1]

    for (var cellI = i - 1; cellI <= i + 1; cellI++) {
        if (cellI < 0 || cellI >= gBoard[i].length) continue;
        for (var cellJ = j - 1; cellJ <= j + 1; cellJ++) {
            if (cellJ < 0 || cellJ >= gBoard[cellI].length) continue;
            if (gBoard[cellI][cellJ].isShown === true) continue;

            gBoard[cellI][cellJ].isShown = true;
            HintNums.push(gBoard[cellI][cellJ])
        }
    }
    renderBoard(gBoard)

    setTimeout(function () {
        removeHint(HintNums)
    }, 1000);
}

function removeHint(HintNums) {
    for (var i = 0; i < HintNums.length; i++) {
        HintNums[i].isShown = false;
    }
    renderBoard(gBoard)
}
