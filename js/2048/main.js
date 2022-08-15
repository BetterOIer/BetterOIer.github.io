var board = [];
var score = 0;
var hasConflicted = [];


//入口函数

$(function () {
    newGame();
})

function newGame() {
    //初始化
    init();
    //在随机两个格子生成数字
    renderOneNumber();
    renderOneNumber();
}

function init() {
    //4 * 4 棋盘
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //灰色的初始棋盘
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i));
            gridCell.css('left', getPosLeft(j));
        }
    }

    //生成数据格子
    for (var i = 0; i < 4; i++) {
        //初始化
        board[i] = []; //二维数组
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;

        }
    }

    //初始化分数
    score = 0;
    updateScore(score);

    updateBoard();
}


function updateBoard() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            // var str = $('#grid-container').append('<div class="number-cell" id="number-cell-' + i +'-" + j></div>');
            // console.log(str);
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                //等于0就是不显示
                theNumberCell.css({
                    'width': '0px',
                    'height': '0px',
                    'top': getPosTop(i) + 50,
                    'left': getPosLeft(j) + 50
                });
            } else {
                //有数值就显示咯
                theNumberCell.css({
                    'width': '100px',
                    'height': '100px',
                    'top': getPosTop(i),
                    'left': getPosLeft(j),
                    'background-color': getBackgroundColor(board[i][j]),
                    'color': getColor(board[i][j])
                });
                theNumberCell.text(board[i][j]);
                if (theNumberCell.text() == 1024 || theNumberCell.text() == 2048 || theNumberCell.text() == 4096 || theNumberCell.text() == 8192) {
                    theNumberCell.css('font-size', '45px');
                }

            }

            hasConflicted[i][j] = false;
        }
    }
}


//生成数字
function renderOneNumber() {
    //判断是否有空格子
    if (nospace(board)) {
        return false;
    }

    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));
    // console.log(randomX);
    // console.log(randomY);
    var times = 0;
    while (times < 30) {
        if (board[randomX][randomY] == 0) {
            break;
        }
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    //性能优化
    if (times == 30) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randomX = i;
                    randomY = j;
                }
            }
        }
        console.log('手动生成');
    }

    //随机一个数字
    var randomNumber = Math.random() < 0.5 ? 2 : 4; //2或4 55开

    //在随机位置显示随机数字
    board[randomX][randomY] = randomNumber;
    showNumber(randomX, randomY, randomNumber);


    return true;
}

$(document).keydown(function (e) {
    switch (e.keyCode) {
        case 37: //左
            if (moveLeft()) {
                setTimeout('renderOneNumber()', 210);
                setTimeout('isGameOver()', 300);
                // renderOneNumber();
                // isGameOver();
            }
            break;
        case 38: //上
            if (moveUp()) {

                setTimeout('renderOneNumber()', 210);
                setTimeout('isGameOver()', 300);

            }
            break;
        case 39: //右
            if (moveRight()) {

                setTimeout('renderOneNumber()', 210);
                setTimeout('isGameOver()', 300);

            }
            break;
        case 40: //下
            if (moveDown()) {

                setTimeout('renderOneNumber()', 210);
                setTimeout('isGameOver()', 300);

            }
            break;
        default:
            break;
    }
})

//游戏是否结束
function isGameOver() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert('gameover!');
}

function moveLeft() {

    //判断是否可以左移动
    if (!canMoveLeft(board)) {
        return false;
    }
    //moveLeft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //如果不为0，那么他是可能向左移动的
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        updateScore(score);
                        //开关
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    //根据数组更新位置
    setTimeout("updateBoard()", 200);
    return true;
}

function moveRight() {

    //判断是否可以右移动
    if (!canMoveRight(board)) {
        return false;
    }

    // flag = false;
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            //如果不为0，那么他是可能向右移动的
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    //根据数组更新位置
    setTimeout("updateBoard()", 200);
    return true;
}

function moveUp() {

    //判断是否可以上移动
    if (!canMoveUp(board)) {
        return false;
    }

    // flag = false;
    //moveUp
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            //如果不为0，那么他是可能向上移动的
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    //根据数组更新位置
    setTimeout("updateBoard()", 200);
    return true;
}

function moveDown() {

    //判断是否可以上移动
    if (!canMoveDown(board)) {
        return false;
    }

    // flag = false;
    //moveUp
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            //如果不为0，那么他是可能向下移动的
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    //根据数组更新位置
    setTimeout("updateBoard()", 200);
    return true;
}