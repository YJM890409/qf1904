<?php
    require "conn.php";

    $result=mysql_query("select * from dongfang");
    for($i=0;$i<mysql_num_rows($result);$i++){
        $arr[$i] = mysql_fetch_array($result,MYSQL_ASSOC);
     }
     echo json_encode($arr);//把表里面的数据拿出来
     
     

?>
