var picStr='<select id="province"><option>--请选择--</option>';
var cityStr='<select id="city"><option>--请选择--</option>';
var conStr='<select id="county"><option>--请选择--</option>';

$.ajax({
    method:"get",
    url:"data/city.json",

    success:function(res){
        if(res.code==200){
            console.log(res.citylist);
            $.each(res.citylist,function(index,item){
                picStr+='<option value="">'+item.p+'</option>';


                 var city=item.c;//定义一个贮存市的数据
                     //console.log(city);
                      for(var i=0;i<city.length;i++){
                          cityStr+='<option value="">'+city[i].n+'</option>';
                          var arr=city[i].a
                          console.log(arr.length);
              $.each(arr,function(){
                    cityStr+='<option value="">'+arr[i].s+'</option>';
              })            
                      }
                      for(var j=0;j<arr.length;j++){
                          conStr+='<option value="">'+arr[j].s+'</option>';
                      }
                
                 console.log(item.c);


                
            });
            picStr+='</select><label>省</label>';
            $(".container").append(picStr);
            cityStr+='</select><label>市</label>';
            $(".container").append(cityStr);
            conStr+='</select><label>市</label>';
            $(".container").append(conStr);


        }
    }
})