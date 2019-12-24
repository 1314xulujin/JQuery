/**
 * 需求:
 *      通过鼠标按下按钮 ,启动游戏,棍子增长 , 松开,棍子停止增长=>棍子倒下 ,人物移动...
 *
 *      鼠标按下: mousedown
 *              1.更换按钮样式
 *              2.棍子增长动画
 *
 *      鼠标起来:mouseup
 *              1.棍子停止增长
 *              2.棍子倒下
 *              3.人先更换奔跑的gif ,然后移动过去
 *              4.判断是否已经通过这个柱子 (比较棍子的长度是否在两个柱子的间距范围之间(min大于间距,(小于间距+100)max))
 *              5.如果已经通过一根柱子:
 *                      1.棍子, 人归位
 *                      2.柱子移动
 *                      3.更新索引值 ,并判断是否已经通过所有的当前关卡柱子
 * */

    var maxWidth = $(".stick").offset().top; //获取棍子距离文档顶部的距离(棍子的最大宽度/高度)
    var index = 1;//下一根柱子索引值
    var moveLeft = 0;//柱子容器需要移动的距离
    var stickNum = 0;//当前的柱子数量
    var isPlay = true; //游戏是否可以继续玩
    var flag = false; //标识是否已经按下过play按钮
    var successText = [
        '勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
        '志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
        '骏马是跑出来的，强兵是打出来的。',
        '只有登上山顶，才能看到那边的风光。',
        '如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
        '平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
        '梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
        '没有激流就称不上勇进，没有山峰则谈不上攀登。',
        '真正的才智是刚毅的志向。 —— 拿破仑',
        '山路曲折盘旋，但毕竟朝着顶峰延伸。',
        '只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
        '敢于向黑暗宣战的人，心里必须充满光明。',
        '种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
        '自然界没有风风雨雨，大地就不会春华秋实。',
        '只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
        '勤奋是你生命的密码，能译出你一部壮丽的史诗。',
        '对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
        '奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
        '忙于采集的蜜蜂，无暇在人前高谈阔论。',
        '勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'
    ];
    var faildText = [
        '志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。',
        '海浪为劈风斩浪的航船饯行，为随波逐流的轻舟送葬。',
        '人生最重要的一点是，永远不要迷失自己。',
        '一个人承受孤独的能力有多大，他的能力就有多大。',
        '实力塑造性格，性格决定命运。',
        '普通人成功并非靠天赋，而是靠把寻常的天资发挥到不寻常的高度。',
        '对于强者，要关注他们的灵魂，对于弱者，他关注他们的生存。',
        '积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
        '成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。',
        '当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
        '有的人一生默默无闻，有的人一生轰轰烈烈，甚至千古流芳，为什么会这样？因为默默无闻的人只是满足于现状，而不去想怎么轰轰烈烈过一生，不要求自己，去做，去行动，怎么能够成功？',
        '人性最可怜的就是：我们总是梦想着天边的一座奇妙的玫瑰园，而不去欣赏今天就开在我们窗口的玫瑰。',
        '在人生的道路上，即使一切都失去了，只要一息尚存，你就没有丝毫理由绝望。因为失去的一切，又可能在新的层次上复得。',
        '没有一劳永逸的开始；也没有无法拯救的结束。人生中，你需要把握的是：该开始的，要义无反顾地开始；该结束的，就干净利落地结束。',
        '生命的奖赏远在旅途终点，而非起点附近。我不知道要走多少步才能达到目标，踏上第一千步的时候，仍然可能遭到失败。但我不会因此放弃，我会坚持不懈，直至成功！',
        '不要认为只要付出就一定会有回报，这是错误的。学会有效地工作，这是经营自己强项的重要课程。',
        '苦心人天不负，卧薪尝胆，三千越甲可吞吴。有志者事竞成，破釜沉舟，百二秦川终属楚。',
        '生命本身是一个过程，成功与失败只是人生过程中一些小小的片段，若果把生命与成功或失败联系在一起，生命将失去本身该有的意义。',
        '我们不要哀叹生活的不幸，诅咒命运的不公。在命运面前，我们要做强者，掐住命运的咽喉，叩问命运，改变命运。',
        '努力和效果之间，永远有这样一段距离。成功和失败的唯一区别是，你能不能坚持挺过这段无法估计的距离。'];
    var level = 1;//关卡数

    $("#play").mousedown(function(){//鼠标按下
    if(!isPlay)return;
    flag = true;
    $(this).addClass("down");
    $(".stick").animate({
        width:maxWidth
    },2000);
})

    $(document).mouseup(function(){//鼠标起来
    if(flag){
        if(!isPlay)return;
        isPlay = false;
        $(".stick").stop();//1.停止棍子的增长
        $(".stick").addClass("down");//2.棍子倒下
        //获取棍子的实际长度(宽度)
        var stickWidth = $(".stick").width();
        //棍子的倒下动画完成之后 ,才开始人物的处理
        setTimeout(function () {//3.人先更换奔跑的gif ,然后移动过去
            $(".man").find("img").attr("src","images/stick.gif").end().animate({
                left:stickWidth + 50,//+50 为了满足视觉效果的位置
            },1500,function(){//4.判断是否已经通过这个柱子
                //设置flag 标识
                flag = false;
                //比较前后两根柱子的间距
                var nextLeft = $(".wall-box .wall").eq(index).offset().left;//获取下一根柱子距离左边的距离
                console.log(nextLeft);
                if(stickWidth>=nextLeft-100 && stickWidth<=nextLeft){
                    // alert('成功通过!');
                    //人 \ 棍子 归位
                    $(".man").find("img").attr("src","images/stick_stand.png").end().hide().css("left",50);
                    $(".stick").width(0).removeClass("down");
                    $("#play").removeClass("down");
                    //计算柱子需要移动的距离
                    moveLeft += $(".wall-box .wall").eq(index).offset().left;
                    //柱子移动
                    $(".wall-box").animate({
                        left:-moveLeft
                    },500,function(){
                        //人显示
                        $(".man").show();
                        //更新下一根柱子的索引值
                        index++;
                        if(index>=stickNum){
                            success();//提示可以进入下一关卡
                            return;
                        }
                        isPlay = true;//开放下一次操作
                    })
                }else{
                    // alert('游戏失败!');
                    $(".man").addClass("down");
                    faild();//失败处理
                }
            });
        },850);
    }
})

//定义一个处理成功的函数
    function success(){
        var num = parseInt(Math.random() * successText.length);
        $("#dialog .name").html(successText[num]);//更换失败提示内容
        $(".dialog-btn").html('<a href="javascript:void(0);" class="play-agin">再试一次</a><a href="javascript:void(0);" class="go-next">下一关</a>');
        $("#mask").fadeIn();
        $("#dialog").fadeIn();
     }

  //定义一个处理失败的函数
   function faild(){
        var num = parseInt(Math.random() * faildText.length);
        $("#dialog .name").html(faildText[num]);//更换失败提示内容
        $(".dialog-btn").html('<a href="javascript:void(0);" class="play-agin">再试一次</a>');
        $("#mask").fadeIn();
        $("#dialog").fadeIn();
    }

  //定义一个方法 用于初始化每一关游戏数据
  function init(){
     //初始化一些基本的游戏数据
    index = 1;//下一根柱子索引值
    moveLeft = 0;//柱子容器需要移动的距离
    isPlay = true; //游戏是否可以继续玩
    flag = false; //标识是否已经按下过play按钮

    $("#mask").fadeOut();
    $("#dialog").fadeOut();

    $(".man").removeClass("down").css("left",50).find("img").attr("src","images/stick_stand.png");
    $(".stick").removeClass("down").width(0);
    $("#play").removeClass("down");
    $(".wall-box").css("left",0);
    /*
    生成柱子,随机出现位置
     棍子的最大宽度  >=  柱子间的间距  >=100
     */
    //生成棍子的数量
    stickNum = level + 3;
    var distance = 0; //每根柱子的间距
    var wallStr = '<div class="wall" style="left: 0px"></div>';//用于存储生成的柱子的div

    for (var i=1;i<stickNum;i++){
        distance+=100 + random(100,maxWidth);
        wallStr+='<div class="wall" style="left: '+distance+'px"></div>';
    }
    //将生成的柱子 ,插入到柱子容器
    $(".wall-box").html(wallStr);
    }

//定义一个生成指定范围的随机数
function random(min,max) {
    return Math.random()*(max - min +1) + min;
}

//首次执行
init();


 //重玩本关
$("body").on('click','.play-agin',init);

//下一关
$("body").on("click",".go-next",function () {
    level++;
    $("#level").html('关卡'+level);
    init();
})
