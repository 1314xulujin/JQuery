var CityData = null; //城市数据
//加载数据
$.getJSON('/data/city.json',function(data){
    CityData = data.citylist;
    // console.log(CityData);
    getProvince(CityData);//生成省份的下拉列表
    getCity(CityData,0);//生成二级城市 , 默认为北京 = 0
    getArea(CityData,0,0);//首次显示北京城市列表信息
})



//定义一个获取省份信息的函数
    function getProvince(CityData) {//CityData 城市数据
        var pStr = '';
        for (index in CityData){
            pStr+='<option value="'+index+'">'+CityData[index].p+'</option>';
        }
        //插入省份的下拉列表
        $("#province").html(pStr);
    }

//定义一个获取二级城市信息的函数
    function getCity(CityData,p){//CityData 城市数据  , p 省份标识
        var Data = CityData[p].c;
        // console.log(Data);
        var cStr = '';
        for (index in Data){
            cStr+='<option value="'+index+'">'+Data[index].n+'</option>';
        }
       //判断是否为直辖市
        if(CityData[p].c[0].hasOwnProperty("a")){
            //插入二级城市的下拉列表
            $("#city").html(cStr);
        }else{ //直辖市
            $("#city").html("<option value='0'>"+CityData[p].p+"</option>");
            //插入到三级城市列表
            $("#area").html(cStr);
        }

    }

//定义一个获取三级城市信息的函数
    function getArea(CityData,p,c){//CityData 城市数据  , p 省份标识 c 二级城市标识
     //判断是否具有三级城市
        if(CityData[p].c[c].hasOwnProperty("a")){
            var Data = CityData[p].c[c].a;
            // console.log(CityData[p].c[c].a);
            var aStr = '';
            for (index in Data){
                aStr+='<option value="'+index+'">'+Data[index].s+'</option>';
            }
            //插入二级城市的下拉列表
            $("#area").html(aStr);
        }
    }

    //省份change 事件
    $("#province").change(function(){
        var p = $(this).val();
        getCity(CityData,p);//生成二级城市
        getArea(CityData,p,0);//生成三级城市  ,默认按照当前省份下的第一个二级 城市 第一个三级城市
    })

    //二级尘世的change事件
    $("#city").change(function(){
        var p = $("#province").val();
        var c = $(this).val();
        getArea(CityData,p,c);
    })