/*需求: 一开始加载5条记录  , 滚动后 , 当滚动到内容的底部时 , 需要继续加载一批新的数据(5条)
*   1.事件 = > scroll
*   2.何时加载数据 : 当我们看到底部那条加载更多的提示线的时候就开始加载
*           1.获取底部(分割线)距离文档顶部距离 (已知)
*           2.获取窗口的高度(已知)
*           3.获取页面的滚动距离(已知)
*
*           可以加载数据 :  (页面滚动距离 + 窗口的高度) > (滚动距离 - 50)
*
* */

var start = 5;//开始位置
var len = 5;//每次加载的数据

// var lineH = $("#line").offset().top; //1.获取滚动加载提示的分割线的距离文档顶部的距离
// var clientH = $(window).height();//2.获取窗口的高度

$(window).scroll(function(){
    var scrollH = $(this).scrollTop();//3.窗口的滚动距离
    var lineH = $("#line").offset().top; //1.获取滚动加载提示的分割线的距离文档顶部的距离
    var clientH = $(window).height();//2.获取窗口的高度
    // console.log(scrollH);
    if( (scrollH + clientH) >= (lineH -50) ){
        console.log("可以加载数据了....");
        var htmlStr = "";
        for(var i=0;i<len;i++){
            start+=1;
            htmlStr+='<div class="box">'+(start)+'</div>';
        }
        $("#container").append(htmlStr);
    }else{
        // console.log("分割线的距离:",lineH,"窗口高度:",clientH,'当前滚动距离',scrollH);
    }
})