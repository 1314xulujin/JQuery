var start = 0;//数据的开始位置
var len = 10;//每页记录数
var page = 60;//当前页码

//----------------------------统一ajax全局配置------------------------------------
console.log($.ajaxSettings);
$.ajaxSetup({
    beforeSend:function(){
        $("#loading").fadeIn();
        // console.log('开发请求之前....');
    },
    complete:function(xhr){
        $("#loading").fadeOut();
    },
    dataType:'json',
});

//全局 的ajax事件
// $.ajaxComplete  无论请求是否成功 ,请求结束
// $.ajaxError  请求失败
// $.ajaxSend 请求数据已发送
// $.ajaxStart 开始发起请求
// $.ajaxStop  请求停止 (目前没有ajax正在进行的请求)
// $.success  请求成功



//定义一个获取数据的方法 = > 用于分页
function loadData(start,len){
    start = (page - 1) * len; //后台要求的开始位置
    $.ajax({
        url:API['getStudent'],
        method:'get',
        data:{
            start:start,
            len:len,
            ak:API.ak
        },
        dataType:'jsonp',//解决跨越
        success:function(res){
            // console.log(res);
            if(res.code == 200){
                //渲染数据
                var htmlStr = '';
                $.each(res.data,function(index,item){
                    htmlStr+='<tr data-sid="'+item.sid+'">\n' +
                        '                <td>'+(index+1)+'</td>\n' +
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
            }else{
                console.log('数据请求失败!');
                //Toast 提示
                Toast('加载数据失败~','error');
            }
        }
    })
}

//首次加载数据
loadData(start,len);

//点击添加学员模态框 =--开始=-----------------------------------
$("#addBtn").click(function(){
    //获取表单数据
    // var data = $("#addForm").serialize(); //表单序列化 = > 直接将表单的数据内容提取为查询字符串格式(键=值)
    var tmp = $("#addForm").serializeArray(); //表单序列化 = > 直接将表单的数据内容提取为查询字符串格式(键=值)
    var data = {};
    //处理需要提交的数据
    $.each(tmp,function(index,item){
        data[item.name] = item.value;
    })
    //带上ak
    data['ak'] = API.ak;
    //提交数据
    $.ajax({
        url:API['insertStudent'],
        method:'post',
        data:data,
        success:function(res){
            console.log(res);
            if(res.code == 200){
                Toast(res.info);
                //隐藏模态框
                $("#addModal").modal('hide');
            }else{
                Toast(res.info,res.code==0?'error':'warning');
            }
        }
    })
})
//点击添加学员模态框 =--结束=-----------------------------------

//点击查看学员模态框 =--开始=-----------------------------------
$("body").on('click','.edit',function(){
    var sid = $(this).parents("tr").data('sid'); //获取当前查询记录的sid
    //请求 ajax 数据
    $.ajax({
        url:API['getStudentBySid'],
        data:{
            sid:sid,
            ak:API.ak
        },
        success:function(res){
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
        }
    })
})
//立即更新
$('#editBtn').click(function(){
    //获取数据 = > 调用更新数据接口
    var tmp = $("#editForm").serializeArray();
    var data = {};
    //处理需要提交的数据
    $.each(tmp,function(index,item){
        data[item.name] = item.value;
    })
    //带上ak
    data['ak'] = API.ak;
    //提交数据
    $.ajax({
        url:API['updateStudentBySid'],
        method:'post',
        data:data,
        success:function(res){
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
        }
    })
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
    $.ajax({
        url:API['removeStudentBySid'],
        method:'post',
        data:{
            sid:sid,
            ak:API.ak
        },success:function(res){
            console.log(res);
            if(res.code == 200){
                Toast(res.info);
                //删除dom上的元素 , 更新局部的数据
                loadData(start,len);
            }else{
                Toast(res.info,res.code==100?'warning':'error');
            }
        }
    })
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