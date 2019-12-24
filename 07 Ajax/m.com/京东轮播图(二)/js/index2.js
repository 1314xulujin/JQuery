/**
 实现轮播图:
 1.实现自动切换
 每隔一段指定的时间间隔,将active类, 给到不同的li
 2.鼠标悬停暂停,播放

 3.鼠标悬停指定按钮,切换对应图片的显示

 */
    //图片li
var imgLi = document.getElementsByClassName("slide-img")[0].children;
//按钮li
var pageLi = document.getElementsByClassName("slide-page")[0].children;
//轮播图容器
var slideBox = document.getElementsByClassName("slide")[0];
//next/ prev 前后翻页
var next = document.getElementsByClassName("next")[0];
var prev = document.getElementsByClassName("prev")[0];

//当前图片索引值
var index = 0;
//图片的数量
var len = imgLi.length;
var timer;//定时器


//定义一个自动播放的函数
function autoplay(){
    timer = setInterval(function(){
        index++;
        move();//切换图片显示
    },1000)
}

//定义一个函数用于切换图片及按钮样式
function move(){
    if(index>=len)index=0;
    //隐藏所有的图片 ,然后再设置一张指定的图片
    //去除所有按钮的样式 ,然后设置一个按钮样式
    for(var i=0;i<len;i++){
        imgLi[i].className = '';
        pageLi[i].className = '';
    }

    imgLi[index].className = 'active';
    pageLi[index].className = 'active';
}
//设置鼠标悬停暂停播放
slideBox.onmouseenter = function(){
    clearInterval(timer);
}

slideBox.onmouseleave = function(){
    //设置定时器自动播放
    autoplay();
}

//设置前后翻页
next.onclick = function(){
    index++;
    move();//切换图片显示
}

prev.onclick = function(){
    index--;
    if(index<0)index=len-1;
    move();//切换图片显示
}

//设置鼠标悬停至按钮,切换对应的图片显示
for(var i=0;i<len;i++){
    pageLi[i].index = i; //给每个li设置一个index属性
    pageLi[i].onmouseover = function(){
        index = this.index;
        move();//切换图片显示
    }
}
//首次自动播放
autoplay();