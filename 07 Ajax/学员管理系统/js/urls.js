//统一管理接口地址
// urls = {
//     // base:"https://lby.link/api/student/",//统一接口的基础路径
//     getStudent:"https://lby.link/api/student/getStudent",//获取所有数据的接口
//     getStudentBySid:"https://lby.link/api/student/getStudentBySid",
//     insertStudent:"https://lby.link/api/student/insertStudent",
//     updateStudentBySid:"https://lby.link/api/student/updateStudentBySid",
//     removeStudentBySid:"https://lby.link/api/student/removeStudentBySid"
// }

// 最终的接口: API

window.API = {};

var urls = {
    baseUrl:"https://lby.link/api/student/",
    student:[
        'getStudent',
        'getStudentBySid',
        'insertStudent',
        'updateStudentBySid',
        'removeStudentBySid'
    ]
}

urls.student.forEach(function(item){
    // console.log(item);
    window.API[item] =  urls.baseUrl + item;
})

//请求数据的ak (token)
    window.API['ak'] = '667a506BcD956E05D5Ddef6b3428A717';

// //封装一个ajax的请求方法
        API.get = function(url,data,callback){
            data.ak = API.ak; //添加ak
            $.ajax({
                method:'get',
                url:API[url],
                data:data,
                success:callback
            })
        }

        API.post = function(url,data,callback){
            data.ak = API.ak;
            $.ajax({
                method:'post',
                url:API[url],
                data:data,
                success:callback
            })
        }

        API.jsonp = function(url,data,callback){
            data.ak = API.ak;
            $.ajax({
                method:'get',
                url:API[url],
                data:data,
                dataType:'jsonp',
                jsonpCallback:'myJsonp',//设定返回的回调函数
                jsonp:'callback',//设定传递的回调函数的参数字段名
                success:callback
            })
        }
