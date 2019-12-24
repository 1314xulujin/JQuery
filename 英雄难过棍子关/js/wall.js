var index = 1;//下一根柱子索引值
var moveLeft = 0;
$("#play").click(function(){
    moveLeft += $(".wall-box .wall").eq(index).offset().left;
    $(".wall-box").animate({
        left:-moveLeft
    },500,function(){
        index++;
    })
})