
//////////// cellClicked ////////////

function cellClicked(id, event) {
    var clicker = event.which;
    var idNums = id.split(',')
    console.log(idNums[0][1])
    if (isGameOn === false) {
        isGameOn = true
        start()
        gFirstClickI = idNums[0];
        gFirstClickJ = idNums[1];
        placeMines()
    }

    if (clicker === 3) {
        gBoard[idNums[0]][idNums[1]].isMarked = true;
        renderBoard(gBoard);
        return
    }

    if (clicker === 1) {
        console.log(idNums[0][1])
        if (gBoard[idNums[0]][idNums[1]].isMine === true) {
            gBoard[idNums[0]][idNums[1]].isShown = true;
            lives--
            elLives.innerText = lives;
            if (lives === 0) {
                var elGameOver = document.querySelector('.game-over');
                elGameOver.style.display = 'block'
                var elTable = document.querySelector('.board');
                elTable.style.display = 'none';
            }
            console.log('lives' + lives)
            renderBoard(gBoard);
        }

        if (gBoard[idNums[0]][idNums[1]].isSafe === true) {
            gBoard[idNums[0]][idNums[1]].isSafe = false;
            gBoard[idNums[0]][idNums[1]].isShown = true;
            renderBoard(gBoard)
        }

        if (gBoard[idNums[0]][idNums[1]].minesAroundCount === 0) {
            expand(idNums)
        }
        else {
            (gBoard[idNums[0]][idNums[1]].isShown = true)
            renderBoard(gBoard)
        }
    }
}
//////////// placeMines ////////////

function placeMines() {
    for (var minesOnBoard = 0; minesOnBoard < gLevel.MINES; minesOnBoard++) {
        var randI = getRandInt(gLevel.SIZE);
        var randJ = getRandInt(gLevel.SIZE);
        if (randI !== gFirstClickI) {

            if (gBoard[randI][randJ].isMine === true) {
                break;
            } else {
                gBoard[randI][randJ].isMine = true;
            }
        }
    }
    setMinesNegsCount()
    renderBoard(gBoard)
}
//////////// setMinesNegs ////////////

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
            negsCount = '';
        }
    }
}



//////////// getRandInt ////////////

function getRandInt(SIZE) {
    var randNum = Math.floor(Math.random() * (SIZE));
    return randNum
};

//////////// Clock ////////////
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")

var Interval;

function start() {
    //    clearInterval(Interval);
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
        // console.log("seconds");
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
    console.log('in safe')
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
    //console.log(gBoard[safeNums[0]][safeNums[1]])
}



function expand(idNums) {
    var j = idNums[1]
    var i = idNums[0]

    for (var cellI = i - 1; cellI <= i + 1; cellI++) {
        if (cellI < 0 || cellI >= gBoard[i].length) continue;
        for (var cellJ = j - 1; cellJ <= j + 1; cellJ++) {
            if (cellJ < 0 || cellJ >= gBoard[cellI].length) continue;
            if (cellI === i && cellJ === j) continue;
            if ((gBoard[cellI][cellJ].minesAroundCount === 0) && (gBoard[cellI][cellJ].isMine === false)) {
                gBoard[cellI][cellJ].isShown = true;
                console.log('now isShown is true at' + cellI + ' ' + cellJ)
            }
        }
    }
    renderBoard(gBoard)
}


function checkIfWon() {
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
    if(gMarked+gShownElements===totalCells)
     youWin();
}