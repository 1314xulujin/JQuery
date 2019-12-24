var start = 0;//数据的开始位置
var len = 10;//每页记录数
var page = 1;//当前页码
var total = 0;//总记录数

//----------------------------统一ajax全局配置------------------------------------
// console.log($.ajaxSettings);
   $.ajaxSetup({
       beforeSend:function(){
           $("#loading").fadeIn();
           // console.log('开发请求之前....');
       },
       complete:function(xhr){
           $("#loading").fadeOut();
       },
       dataType:'json'
   });

   //全局 的ajax事件
   // $.ajaxComplete  无论请求是否成功 ,请求结束
   // $.ajaxError  请求失败
   // $.ajaxSend 请求数据已发送
   // $.ajaxStart 开始发起请求
   // $.ajaxStop  请求停止 (目前没有ajax正在进行的请求)
   // $.success  请求成功
 // 使用示例 : $(document).ajaxError(function(){})

//定义一个获取数据的方法 = > 用于分页
function loadData(){
    start = (page - 1) * len; //后台要求的开始位置
    var data = {
        start:start,
        len:len,
    };
    API.jsonp('getStudent',data,function(res){
        // console.log(res);
        if(res.code == 200){
            //渲染数据
            var htmlStr = '';
            total = res.count;//总记录数据
            $.each(res.data,function(index,item){
                htmlStr+='<tr data-sid="'+item.sid+'">\n' +
                    '                <td>'+((page -1)*len + index+1)+'</td>\n' +
                    '                <td>'+item.sid+'</td>\n' +
                    '                <td>'+item.name+'</td>\n' +
                    '                <td>'+item.sex+'</td>\n' +
                    '                <td>'+item.class+'</td>\n' +
                    '                <td>'+item.address+'</td>\n' +
                    '                <td>'+(moment(item.create_time * 1000).format("YYYY-MM-DD HH:mm:ss"))+'</td>\n' +
                    '                <td>\n' +
                    '                    <button class="btn btn-success btn-xs edit">\n' +
                    '                        <span class="glyphicon glyphicon-eye-open"></span>\n' +
                    '                        查看\n' +
                    '                    </button>\n' +
                    '                    <button class="btn btn-danger btn-xs delete">\n' +
                    '                        <span class="glyphicon glyphicon-remove"></span>\n' +
                    '                        删除\n' +
                    '                    </button>\n' +
                    '                </td>\n' +
                    '            </tr>'

            });
            //插入表格
            $(".table tbody").html(htmlStr);
            //Toast 提示
            Toast('加载数据成功~');
            //重新处理分页
            pagination();
        }else{
            console.log('数据请求失败!');
            //Toast 提示
            Toast('加载数据失败~','error');
        }
    });
}

//首次加载数据
loadData();

//点击添加学员模态框 =--开始=-----------------------------------
$("#addBtn").click(function(){
    //获取表单数据
    var tmp = $("#addForm").serializeArray(); //表单序列化 = > 直接将表单的数据内容提取为查询字符串格式(键=值)
    var data = formatData(tmp);//格式化数据
    //提交数据
    API.post('insertStudent',data,function(res){
        console.log(res);
        if(res.code == 200){
            Toast(res.info);
            //隐藏模态框
            $("#addModal").modal('hide');
        }else{
            Toast(res.info,res.code==0?'error':'warning');
        }
    });
})
//点击添加学员模态框 =--结束=-----------------------------------

//点击查看学员模态框 =--开始=-----------------------------------
$("body").on('click','.edit',function(){
   var sid = $(this).parents("tr").data('sid'); //获取当前查询记录的sid

   //请求 ajax 数据
    API.get('getStudentBySid',{sid:sid},function(res){
        console.log(res);
        if(res.code == 200){
            Toast(res.info);
            //数据回填
            $.each(res.data,function(index,item){
                // console.log(index,item);
                if(index == 'create_time'){
                    item = moment(item * 1000).format('YYYY年MM月DD日 HH:mm:ss');
                }
                //单独性别选项
                if(index == 'sex'){
                    $("#editForm [name="+index+"]").filter("[value="+item+"]")[0].checked=true;
                    // console.log($("#editForm [name="+index+"]").filter("[value="+item+"]"));
                    // console.log($("#editForm [name="+index+"]").filter());
                }else{
                    $("#editForm [name="+index+"]").val(item);
                }

            })
            //显示模态框
            $("#editModal").modal("show");
        }else{
            Toast(res.info,res.code==0?'error':'warning');
        }
    });
})
//立即更新
$('#editBtn').click(function(){
    //获取数据 = > 调用更新数据接口
    var tmp = $("#editForm").serializeArray();
    var data = formatData(tmp);
    //提交数据
    API.post("updateStudentBySid",data,function(res){
        // console.log(res);
        if(res.code == 200){
            Toast(res.info);
            //隐藏模态框
            $("#addModal").modal('hide');
            //更新DOM
            var tds = $("tr[data-sid="+data['sid']+"]").children();
            console.log(tds);
            tds.eq(2).html(data['name']) ;
            tds.eq(3).html(data['sex']);
            tds.eq(4).html(data['class']);
            tds.eq(5).html(data['address']);
            $("#editModal").modal('hide');
        }else{
            Toast(res.info,res.code==0?'error':'warning');
        }
    });
})
//点击查看学员模态框 =--结束=-----------------------------------

//删除查看学员模态框 =--开始=-----------------------------------
$("body").on('click','.delete',function(){
    $("#confirmModal").modal('show');
    var sid = $(this).parents("tr").data("sid");//获取当前删除按钮的sid标识
    //获取学员名字
    var name = $(this).parents("tr").children().eq(2).text();
    $("#confirmModal .modal-body span").html(name);
    //将sid 存入到模态框中
    // $("#confirmModal").attr("data-sid",sid);
    $("#confirmModal").data("sid",sid);
})

//确认删除 = > 调用后台接口 ,删除数据库的数据
$("#confirmDelete").click(function(){
    //取出sid , 然后再调用后台的删除接口
    var sid = $("#confirmModal").data("sid");
    //调用删除接口
    $("#confirmModal").modal('hide');
    API.post("removeStudentBySid",{sid:sid},function(res){
        console.log(res);
        if(res.code == 200){
            Toast(res.info);
            //删除dom上的元素 , 更新局部的数据
            loadData(start,len);
        }else{
            Toast(res.info,res.code==100?'warning':'error');
        }
    });
})

//点击查看学员模态框 =--结束=-----------------------------------
//封装一个Toast 组件 (提供重复利用)
function Toast(msg,type){//msg 提示的内容  ,type 类型风格
    $(".toast").remove();
    var type = type || 'success';
    var htmlStr = '<div class="toast '+type+'">'+msg+'</div>';
    //插入body末尾处
    $("body").append(htmlStr);
    setTimeout(function(){
        $(".toast").fadeOut(600,function(){
            $(this).remove();
        });
    },2000);
}

//封装一个处理表单序列化数据格式
function formatData(array){
    var data = {};
    //处理需要提交的数据
    $.each(array,function(index,item){
        data[item.name] = item.value;
    })
    return data;
}


//分页函数 (处理分页)
function pagination(){
   var count = Math.ceil(total / len);
   // var count = 10;
   var htmlStr ='<li class="prev"><a href="javascript:void(0)">&laquo;</a></li>';
  for(var i=0;i<count;i++){
      //情况: 1.前 5 页  2.从第6页开始,至末尾倒数第三个 3.截止最后末尾的倒数第三个往前
      if(page<6 && i<7){//生成前5页的数字按钮
        htmlStr+=' <li data-page="'+(i+1)+'"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
      }else if(page >=6 && (i>(page-6) && i<page+2) && ((count - page) >=3)){//生成从第6页开始后截止倒数3页前的数字按钮
          // console.log(i);
        htmlStr+=' <li data-page="'+(i+1)+'"><a href="javascript:void(0)">'+(i+1)+'</a></li>'
      }else if(page >=6 && (i>=(count-8)) && ((count - page) <3)){//已经接近末尾倒数第三个后 ,整体的数字按钮 不需要改变位置
          // console.log(i);
          htmlStr+=' <li data-page="'+(i+1)+'"><a href="javascript:void(0)">'+(i+1)+'</a></li>'
      }
  }
    //当页码在接近末尾页的时候,不需要...
    if((count - page) >3 && count >=7){
        htmlStr+='<li><a>...</a></li>';
    }

    //(count - page )<3 代表已经是末尾倒数3页之间
    if(!((count - page )<3)){
        htmlStr+='<li data-page="'+count+'"><a href="javascript:void(0)">'+count+'</a></li>';
    }
    htmlStr+='<li class="next"><a href="javascript:void(0)">&raquo;</a></li>';
  //插入分页容器
    $(".pagination").html(htmlStr);

    //更新当前页的效果
    $(".pagination li[data-page="+page+"]").addClass("active");
    //检测是否为第一页 或者最后一页 ,禁用前后翻页
    if(page == 1){
        $(".prev").addClass("disabled");
    }else if(page == count){
        $(".next").addClass("disabled");
    }
}

//下一页处理
$(".pagination").on('click','.next:not(.disabled)',function(){
    page++;
    loadData();//加载数据
    // console.log(page);
})

//下一页处理
$(".pagination").on('click','.prev:not(.disabled)',function(){
    page--;
    loadData();//加载数据
    // console.log(page);
})

//跳转指定页
$("#jump").click(function(){
    var num = $("#page").val();
    var count = Math.ceil(total / len);
    if(num>count || num=="" || num <=0){
        alert('MMP没有那么多页了!');
    }else{
        page = parseInt(num);
        loadData();//加载数据
    }
})

//给对应页码 -点击事件
$(".pagination").on('click','li[data-page]',function(){
    page = $(this).data("page");
    loadData();
})