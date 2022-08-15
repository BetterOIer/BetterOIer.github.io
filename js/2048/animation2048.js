function showNumber(i,j,randomNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css('background-color',getBackgroundColor(randomNumber));
    numberCell.css('color',getColor(randomNumber));
    numberCell.text(randomNumber);

    // console.log(numberCell);

    //生成动画
    numberCell.animate({
        width: "100px",
        height: "100px",
        top:getPosTop(i),
        left:getPosLeft(j)
    },50);
}

/**
 *
 * @param fromX 起始行数
 * @param fromY 起始列数
 * @param toX   目标行数
 * @param toY   目标列数
 */
function showMoveAnimation(fromX,fromY,toX,toY) {
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        top:getPosTop(toX),
        left:getPosLeft(toY)
    },200)
}

function updateScore(score){
    $('#score').text(score);
}