<?php
   // header("Access-Control-Allow-Origin:*");
   // header("Access-Control-Expose-Headers:*");
    //header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
    //header("Access-Control-Allow-Headers:*");

	//数组 (二维数组)
	$arr = array(
	array("imgUrl"=>"images/focus.jpg","url"=>"https://www.baidu.com"),
	array("imgUrl"=>"images/focus1.jpg","url"=>"https://www.baidu.com"),
	array("imgUrl"=>"images/focus2.jpg","url"=>"https://www.baidu.com"),
	array("imgUrl"=>"images/focus3.jpg","url"=>"https://www.baidu.com"),
	array("imgUrl"=>"images/focus4.jpg","url"=>"https://www.baidu.com")
	);


	//需要返回给前端的数据 (三维数组)
	$data = array(
		"code"=>200,
		"msg"=>'Successful request for data from the rotation chart!',
		"data"=>$arr
		);
	//print_r($arr);	 //输出数组(对象)
	
	//将数组转换成 json 字符字符串
	$json = json_encode($data);  
	
	 // json_decode() 将json字符串 ,解析为php中的对象 与数组
	
	echo $json;
?>