/***
 *  失去焦点 +  内容发生改变   =  change事件
 */

 var isOk = false;//用户名是否可用

 $(".username").change(function(){
    var username = $(this).val();
   //ajax 后端唯一性检测
   $.ajax({
       url:"http://class4/checkUser",
       data:{
           UserName:username
       },
       dataType:"json",
       success:function(res){
        $(".username").parent().children("span").remove();
          if(res.code == 200){
              isOk = true;
              $(".username").parent().append(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>').parent().removeClass("has-error").addClass("has-success");
          }else if(res.code == 100){
            isOk = false;
            $(".username").parent().append(' <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>').parent().removeClass("has-success").addClass("has-error");
            //生成提示内容
            var htmlStr = '';
            $.each(res.data,function(index,item){
               htmlStr+='<li class="list-group-item" data-username="'+item+'">'+item+'</li>';
            })    
           //插入
           $(".list-group").html(htmlStr);     

        }
       }
   })
 })


 $(".list-group").on("click",".list-group-item",function(){
    var username =  $(this).data("username");
    $(".username").val(username);
    $(".list-group").empty();

    $(".username").parent().children("span").remove();
    $(".username").parent().append(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>').parent().removeClass("has-error").addClass("has-success");
    isOk = true;
 })