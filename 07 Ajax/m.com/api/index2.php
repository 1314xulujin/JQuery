<?php
    header("Content-Type:text/html;charset=utf-8");
   //echo '<h1>hello world!</h1>'.date('Y-m-d H:i:s',time()); //输出
    //$name = $_GET['name'];
    //$age = $_GET['age'];
    //$sex = $_GET['sex'];

    $name = $_POST['name'];
    $age = $_POST['age'];
    $sex = $_POST['sex'];

    if($sex== '男'){
        echo $name.'先生,欢迎您,访问本站!';
    }else{
        echo $name.'女士,欢迎您访问本站!';
    }
?>