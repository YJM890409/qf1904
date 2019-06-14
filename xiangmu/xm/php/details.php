<?php
require "conn.php";
if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $arr= mysql_query("select * from dongfang where sid='$sid'");
    echo json_encode(mysql_fetch_array($arr,MYSQL_ASSOC));
   
}
