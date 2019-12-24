//使用ajax 加载轮播图数据
$.ajax({
    url:"../api/",
    method:"get",
    dataType:"json",//设置json 时 ,jQuery会自动将数据解析为json对象
    success:function (res) {
        // var data = JSON.parse(res); //将json字符串解析为json对象
        console.log(typeof res);
        if(res.code == 200){//返回的状态码为200 成功 说明已经获取到数据 (考虑到服务器需要相关的安全认证 ,ajax成功不一定有数据 )
            console.log(res.data);
            //生成对应的布局需要的html结构
            var imgStr = '<ul class="slide-img">'; //图片的html结构
            var pageStr = '<ul class="slide-page">';//按钮的html结构
            $.each(res.data,function(index,item){
                // console.log(item);
                imgStr+='<li><a href="'+item.url+'"><img src="'+item.imgUrl+'"></a></li>';
                pageStr+='<li>'+(index + 1)+'</li>';
            })
            //把占位元素 删除
            $(".slide .placeholder").remove();
            imgStr+="</ul>";
            pageStr+="</ul>";
           $(imgStr).appendTo(".slide");
           $(pageStr).appendTo(".slide");
           //开始轮播图
            initSlide();
        }else{//请求数据返回错误
            $(".placeholder").html(res.code + " 数据加载失败,请<a href='javascript:window.location.reload()'>刷新</a>页面重试~");
        }
    },

/*
*   需求:
*       1.实现轮播图自动播放
*       2.实现鼠标悬停暂停自动播放
*       3.实现前后翻页
*       4.实现鼠标悬停对应按钮切换显示图片
* */
error(err){
        console.log(err);
        $(".placeholder").html("数据加载失败,请<a href='javascript:window.location.reload()'>刷新页</a>面重试~");
    }
})


var index = +1;
var imgLi = null; //获取图片li
var pageLi = null;//获取按钮li
// var len = imgLi.length; //获取图片li的长度
var len = 0; //获取图片li的长度
var isPlay = true;

//自动切换的方法
function autoplay(){
    if(isPlay){
        index++;
        move();//切换显示
    }
    setTimeout(autoplay,1000);
}

//切换图片方法
function move(){
    if(index>=len)index=0; //判断最后一张
    if(index<0)index=len - 1;//判断是否为第一张之前
    //隐藏所有元素
    imgLi.css("display","none");
    // $(imgLi[index]).css("display","block");
    imgLi.eq(index).css("display","block");
    //还原所有按钮样式
    pageLi.css({
        background:"#f1f1f1",
        color:"#666"
    });
    pageLi.eq(index).css({
        background:"#ff3c3c",
        color:"#fff"
    })

}


//鼠标悬停操作 (链式操作 /编程)
$(".slide").mouseover(function(){
    isPlay = false;
}).mouseout(function(){
    isPlay = true;
})

//$(".slide").mouseover().mouseout().click().css()

//下一页
$(".next").click(function () {
    index++;
    move();
})

//上一页
$(".prev").click(function () {
    index--;
    move();
})


//定义一个轮播图初始化函数(在ajax请求完数据之后 ,进行的轮播图初始化操作)
function initSlide(){
    imgLi = $(".slide-img li");
    pageLi = $(".slide-page li");
    len = imgLi.size();

    //鼠标悬停指定按钮,切换显示对应的图片
    pageLi.mouseover(function(){
        // console.log(this); //this = >  li 的DOM对象
        index = $(this).index();//获取当前元素 ,在当前元素的父级层级中的索引值
        // console.log(index);
        move();
    })


    autoplay();//首次 自动播放

}