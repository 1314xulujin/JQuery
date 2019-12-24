/*
*   需求:
*       1.实现轮播图自动播放
*       2.实现鼠标悬停暂停自动播放
*       3.实现前后翻页
*       4.实现鼠标悬停对应按钮切换显示图片
* */
    var index = -1;
    var imgLi = $(".slide-img li"); //获取图片li
    var pageLi = $(".slide-page li");//获取按钮li
    // var len = imgLi.length; //获取图片li的长度
    var len = imgLi.size(); //获取图片li的长度
    var isPlay = true;

    //自动切换的方法
    function autoplay(){
       if(isPlay){
           index++;
           move();//切换显示
       }
        setTimeout(autoplay,500);
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

    autoplay();//首次 自动播放

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

    //鼠标悬停指定按钮,切换显示对应的图片
    pageLi.mouseover(function(){
        // console.log(this); //this = >  li 的DOM对象
        index = $(this).index();//获取当前元素 ,在当前元素的父级层级中的索引值
        // console.log(index);
        move();
    })